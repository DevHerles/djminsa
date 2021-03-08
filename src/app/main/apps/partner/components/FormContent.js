import {Avatar, IconButton, AppBar, Checkbox, Card, CardContent, Toolbar, Button, Tab, Tabs, TextField, InputAdornment, Icon, Typography, Paper} from '@material-ui/core';
import React, {Fragment, useEffect, useState} from 'react';
import ReactTable from "react-table";
import {FusePageSimple, FuseAnimate, FuseAnimateGroup} from '@fuse';
import {useDispatch, useSelector} from 'react-redux';
import {useForm, FormProvider} from 'react-hook-form';
import withReducer from 'app/store/withReducer';
import {makeStyles} from '@material-ui/styles';
import ReadOnlyField from '../components/ReadOnlyField';
import * as Actions from '../store/actions';
import reducer from '../store/reducers';
import {FormInput, FormSelect, FormDatePicker, FormRadio} from '@asf';
import FormHeader from './FormHeader';
import FormContentToolBar from './FormContentToolBar';
import {FormRow} from '@asf';
import HealthSymptomsTab from './HealthSymptomsTab';
import FormDataTable from './FormDataTable';

import {yupResolver} from '@hookform/resolvers';
import * as yup from 'yup';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    layoutHeader: {
        height: 140,
        minHeight: 140,
        [theme.breakpoints.down('md')]: {
            height: 140,
            minHeight: 140
        }
    }
}));

const docTypes = [
    {
        id: "DNI",
        label: "DNI",
    },
    {
        id: "CE",
        label: "CARNÉ EXTRANJERÍA",
    },
    {
        id: "PTP",
        label: "PTP",
    },
];
const personTypeOptions = [
    {
        value: "EMPLEADO",
        label: "Empleado",
    },
    {
        value: "TERCERO",
        label: "Tercero",
    },
    {
        value: "OTRO",
        label: "Otro",
    },
];

// TODO
// dynamic forms
//https://jasonwatmore.com/post/2020/09/29/react-dynamic-form-example-with-react-hook-form

const API_PATH='partners';
const NEW='new';

function FormContent ({props}) {
    const schema = yup.object().shape({
        // password: yup.string()
        //     .transform(x => x === '' ? undefined : x)
        //     .concat(isAddMode ? Yup.string().required('Password is required') : null)
        //     .min(6, 'Password must be at least 6 characters'),
        // confirm_password: yup.string()
        //     .transform(x => x === '' ? undefined : x)
        //     .when('password', (password, schema) => {
        //         if (password || isAddMode) return schema.required('Confirm Password is required');
        //     })
        //     .oneOf([Yup.ref('password')], 'Passwords must match')
        type: yup
            .string()
            .required('El tipo de socio es requerido'),
        doc_type: yup.string().required('El tipo de documento es requerido'),
        doc_number: yup.string().required('El número de documento es requerido'),
        first_name: yup
            .string()
            .matches(/^([^0-9]*)$/, "El apellido paterno no puede tener números")
            .required('El apellido paterno es requerido'),
        last_name: yup
            .string()
            .matches(/^([^0-9]*)$/, "El apellido materno no puede tener números")
            .required('El apellido materno es requerido'),
        name: yup
            .string()
            .matches(/^([^0-9]*)$/, "El nombre no puede tener números")
            .required('El nombre es requerido'),
        email: yup.string().email("Ingrese un correo electrónico válido").required('El correo electrónico es requerido'),
        phone: yup
            .string()
            .matches(/^[9]\d{8}$/, 'El número de contacto debe iniciar con 9 y contener 9 dígitos')
            .required('El número de contacto es requerido'),
        dob: yup.date().default(function () {
                return new Date();
            }).required('La fecha de nacimiento es requerido'),
    });
    const classes = useStyles();
    const dispatch = useDispatch();
    const record = useSelector(({partnerApp}) => partnerApp.record);
    const contacts = useSelector(({partnerApp}) => partnerApp.records.data);
    const [isAddMode, setIsAddMode] = useState(true);
    const [recordId, setRecordId] = useState(NEW);
    const [form, setForm] = useState(record.data);
    const [selectedTab, setSelectedTab] = useState(0);
    const [filteredData, setFilteredData] = useState(null);
    const selectedContactIds = [];
    function handleTabChange(event, value)
    {
        setSelectedTab(value);
        console.log(value);
    }

    const methods = useForm({
        defaultValues: form,
        mode: 'onBlur',
        resolver: yupResolver(schema),
    });
    const {register, handleSubmit, errors, reset, formState} = methods;

    useEffect(() => {
        function updateFormState(){
            const params = props.match.params;
            setRecordId(params.id);

            if(recordId === NEW) {
                dispatch(Actions.newRecord());
                setIsAddMode(true);
            } else {
                dispatch(Actions.getById(API_PATH, recordId));
                setIsAddMode(false);
            }
        }
        updateFormState();
    }, [recordId, dispatch, props.match.params]);

    useEffect(() => {
        if (
            (record.data && !form) ||
            (record.data && form && record.data._id !== form._id)
        )
        {
            setForm(record.data);
            reset(record.data);
            if (record.data._id) {
                setIsAddMode(false);
            }
        }
    }, [record.data]);

    const onSubmit = data => {
        isAddMode ? dispatch(Actions.create(API_PATH, data)) : dispatch(Actions.updateById(API_PATH, recordId, data))
    }

    const onError = error => {
        console.log(error);
    }

    const tabs = [
        {
            label: "Datos personales"
        },
        {
            label: "Datos de salud"
        }
    ];
    const symptomsColumns = [];
    const symptomsRows = [];
    const healthRows = [];
    const healthColumns = [
        { id: "q1", label: "Fecha" },
        { id: "q2", label: "Condición" },
    ];
    return (
    <div>
        <FusePageSimple
            classes={{
                header: classes.layoutHeader,
                toolbar: "px-16 sm:px-14"
            }}
            header={
                <FormHeader
                    title={ isAddMode ? 'Nuevo' : `${form.name} ${form.first_name} ${form.last_name}`}
                    onSubmit={handleSubmit(onSubmit, onError)}
                />
            }
            contentToolbar={
                <FormContentToolBar
                    tabs={tabs}
                    selectedTab={selectedTab}
                    handleTabChange={handleTabChange}
                />
            }
            content={
                <div className="p-16 sm:p-24">
                    <FormProvider {...methods}>
                        <form autoComplete="off" noValidate>
                            {selectedTab === 0 && (
                                <div className="flex flex-col flex-1">
                                    <FuseAnimateGroup
                                        enter={{
                                            animation: "transition.slideUpBigIn"
                                        }}
                                    >
                                        <Fragment>
                                            <Card className="w-full mb-16">
                                                <AppBar position="static" elevation={0}>
                                                    <Toolbar className="pl-16 pr-8">
                                                        <Typography variant="subtitle1" color="inherit" className="flex-1">
                                                            Información general
                                                        </Typography>
                                                    </Toolbar>
                                                </AppBar>
                                            </Card>
                                            <CardContent>
                                                <FormRow icon="card_travel">
                                                    <FormRadio
                                                        name="type"
                                                        label="Tipo de persona"
                                                        options={personTypeOptions}
                                                        required={true}
                                                        errorobj={errors}
                                                    />
                                                </FormRow>
                                                <FormRow icon="credit_card">
                                                    <FormSelect
                                                        className="flex"
                                                        name="doc_type"
                                                        label="Tipo de documento"
                                                        options={docTypes}
                                                        required={true}
                                                        errorobj={errors}
                                                    />
                                                    <FormInput
                                                        className="flex"
                                                        label="Número de documento"
                                                        name="doc_number"
                                                        required={true}
                                                        errorobj={errors}
                                                        />
                                                </FormRow>
                                                <FormRow icon="account_circle">
                                                    <FormInput
                                                        className="flex pr-20"
                                                        label="Nombres"
                                                        name="name"
                                                        required={true}
                                                        errorobj={errors}
                                                    />
                                                    <FormInput
                                                        className="pr-20"
                                                        label="Apellido Paterno"
                                                        name="first_name"
                                                        required={true}
                                                        errorobj={errors}
                                                    />
                                                    <FormInput
                                                        className="flex"
                                                        label="Apellido Materno"
                                                        name="last_name"
                                                        required={true}
                                                        errorobj={errors}
                                                    />
                                                </FormRow>
                                                <FormRow icon="cake">
                                                    <FormDatePicker
                                                        label="Fecha de nacimiento"
                                                        name="dob"
                                                        required={true}
                                                        errorobj={errors}
                                                    />
                                                </FormRow>
                                                <FormRow icon="email">
                                                    <FormInput
                                                        className="min-w-48"
                                                        label="Email"
                                                        name="email"
                                                        required={true}
                                                        errorobj={errors}
                                                    />
                                                </FormRow>
                                                <FormRow icon="contact_phone">
                                                    <FormInput
                                                        className="min-w-2x1"
                                                        label="Número de celular"
                                                        name="phone"
                                                        required={true}
                                                        errorobj={errors}
                                                    />
                                                </FormRow>
                                            </CardContent>
                                            <Card className="w-full mb-16">
                                                <AppBar position="static" elevation={0}>
                                                    <Toolbar className="pl-16 pr-8">
                                                        <Typography variant="subtitle1" color="inherit" className="flex-1">
                                                            Datos laborales
                                                        </Typography>
                                                    </Toolbar>
                                                </AppBar>
                                            </Card>
                                            <CardContent>
                                                <FormRow icon="domain">
                                                    <FormSelect
                                                        className="flex"
                                                        name="organ"
                                                        label="Organo"
                                                        options={docTypes}
                                                        required={true}
                                                        errorobj={errors}
                                                    />
                                                    <FormSelect
                                                        className="flex"
                                                        name="organic_unit"
                                                        label="Unidad orgánica"
                                                        options={docTypes}
                                                        required={true}
                                                        errorobj={errors}
                                                    />
                                                    <FormInput
                                                        className="flex"
                                                        name="functional_team"
                                                        label="Equipo funcional"
                                                        required={true}
                                                        errorobj={errors}
                                                    />
                                                </FormRow>
                                                <FormRow icon="work">
                                                    <FormInput
                                                        className="flex"
                                                        name="position"
                                                        label="Cargo"
                                                        required={true}
                                                        errorobj={errors}
                                                    />
                                                    <FormSelect
                                                        className="flex"
                                                        name="x"
                                                        label="Modalidad de vinculación"
                                                        options={docTypes}
                                                        required={true}
                                                        errorobj={errors}
                                                    />
                                                    <FormSelect
                                                        className="flex"
                                                        name="work_type"
                                                        label="Modadidad de trabajo"
                                                        options={docTypes}
                                                        required={true}
                                                        errorobj={errors}
                                                    />
                                                </FormRow>
                                            </CardContent>
                                        </Fragment>
                                    </FuseAnimateGroup>
                                </div>
                            )}
                            {selectedTab === 1 && (
                                <Fragment>
                                    <Card className="w-full mb-16">
                                        <AppBar position="static" elevation={0}>
                                            <Toolbar className="pl-16 pr-8">
                                                <Typography variant="subtitle1" color="inherit" className="flex-1">
                                                    Historial de declaraciones juradas de salud
                                                </Typography>
                                            </Toolbar>
                                        </AppBar>
                                    </Card>
                                    <HealthSymptomsTab
                                        title="Declaraciones juradas de salud"
                                        columns={healthColumns}
                                        rows={healthRows}
                                    />
                                    <br></br>
                                    <Card className="w-full mb-16">
                                        <AppBar position="static" elevation={0}>
                                            <Toolbar className="pl-16 pr-8">
                                                <Typography variant="subtitle1" color="inherit" className="flex-1">
                                                    Historial de declaraciones juradas de sintomatologías
                                                </Typography>
                                            </Toolbar>
                                        </AppBar>
                                    </Card>
                                    <HealthSymptomsTab
                                        title="Declaraciones juradas de sintomatologías"
                                        columns={symptomsColumns}
                                        rows={symptomsRows}
                                    />
                                </Fragment>
                            )}
                        </form>
                    </FormProvider>
                </div>
            }
        />
        {/* <FormProvider {...methods}>
            <form autoComplete="off" noValidate>
                <Grid container spacing={0}>
                    <Grid className="flex flex-col flex-1 md:pr-32">
                        <Card className={classes.paper}>
                            <AppBar position="static" elevation={0}>
                                <Toolbar className="pl-16 pr-8">
                                    <Typography variant="subtitle1" color="inherit" className="flex-1">
                                        Información general
                                    </Typography>
                                </Toolbar>
                            </AppBar>
                            <CardContent>
                                <FormInput
                                    //className="pr-14"
                                    label="Nombres"
                                    name="name"
                                    required={true}
                                    errorobj={errors}
                                />
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid className="flex flex-col flex-1 md:pr-32">
                        <Card className={classes.paper}>
                            <AppBar position="static" elevation={0}>
                                <Toolbar className="pl-16 pr-8">
                                    <Typography variant="subtitle1" color="inherit" className="flex-1">
                                        Información general
                                    </Typography>
                                </Toolbar>
                            </AppBar>
                            <CardContent>
                                <FormInput
                                    //className="pr-14"
                                    label="Nombres"
                                    name="name"
                                    required={true}
                                    errorobj={errors}
                                />
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </form>
        </FormProvider>
         */}
        {/* <FormProvider  {...methods}>
        <form>
            <div className="flex flex-col flex-1 md:pr-32">
                <FuseAnimateGroup
                    enter={{
                        animation: "transition.slideUpBigIn"
                    }}
                >
                    <Card className="w-full mb-16">
                        <AppBar position="static" elevation={0}>
                            <Toolbar className="pl-16 pr-8">
                                <Typography variant="subtitle1" color="inherit" className="flex-1">
                                    Información general
                                </Typography>
                            </Toolbar>
                        </AppBar>

                        <CardContent>
                        <Button
                            variant="contained" color="primary"
                            disabled={formState.isSubmitting}
                            onClick={handleSubmit(onSubmit)}>
                            Submit
                        </Button>
                        <Button
                            type="reset" variant="contained"
                            disabled={formState.isSubmitting}>
                            Reset
                        </Button>
                            <div className="flex">
                                <div className="min-w-48 pt-20">
                                    <Icon color="action">account_circle</Icon>
                                </div>
                                <FormInput
                                    //className="pr-14"
                                    label="Nombres"
                                    name="name"
                                    required={true}
                                    errorobj={errors}
                                />
                                <Input
                                    ref={register}
                                    className="mb-24"
                                    label="Apellido Paterno"
                                    id="first_name"
                                    name="first_name"
                                    variant="outlined"
                                    error={!!errors.first_name}
                                    helperText={errors?.first_name?.message}
                                />
                            </div>
                            
                            <div className="flex">
                                <div className="min-w-48 pt-20">
                                </div>
                                <Input
                                    ref={register}
                                    className="mb-24"
                                    label="Apellido Materno"
                                    id="last_name"
                                    name="last_name"
                                    variant="outlined"
                                    error={!!errors.last_name}
                                    helperText={errors?.last_name?.message}
                                />
                            </div>
                            <div className="flex">
                                <div className="min-w-48 pt-20">
                                    <Icon color="action">star</Icon>
                                </div>
                                <TextField
                                    className="mb-24"
                                    label="Nickname"
                                    id="nickname"
                                    name="nickname"
                                    value={form.nickname}
                                    variant="outlined"
                                    fullWidth
                                />
                            </div>

                            <div className="flex">
                                <div className="min-w-48 pt-20">
                                    <Icon color="action">phone</Icon>
                                </div>
                                <TextField
                                    className="mb-24"
                                    label="Phone"
                                    id="phone"
                                    name="phone"
                                    value={form.phone}
                                    variant="outlined"
                                    fullWidth
                                />
                            </div>

                            <div className="flex">
                                <div className="min-w-48 pt-20">
                                    <Icon color="action">email</Icon>
                                </div>
                                <Input
                                    ref={register}
                                    label="Email"
                                    id="email"
                                    name="email"
                                    error={!!errors.email}
                                    helperText={errors?.email?.message}
                                />
                            </div>

                            <div className="flex">
                                <div className="min-w-48 pt-20">
                                    <Icon color="action">domain</Icon>
                                </div>
                                <TextField
                                    className="mb-24"
                                    label="Company"
                                    id="company"
                                    name="company"
                                    value={form.company}
                                    variant="outlined"
                                    fullWidth
                                />
                            </div>

                            <div className="flex">
                                <div className="min-w-48 pt-20">
                                    <Icon color="action">work</Icon>
                                </div>
                                <TextField
                                    className="mb-24"
                                    label="Job title"
                                    id="jobTitle"
                                    name="jobTitle"
                                    value={form.jobTitle}
                                    variant="outlined"
                                    fullWidth
                                />
                            </div>

                            <div className="flex">
                                <div className="min-w-48 pt-20">
                                    <Icon color="action">cake</Icon>
                                </div>
                                <TextField
                                    className="mb-24"
                                    id="birthday"
                                    label="Birthday"
                                    type="date"
                                    value={form.birthday}
                                    InputLabelProps={{
                                        shrink: true
                                    }}
                                    variant="outlined"
                                    fullWidth
                                />
                            </div>

                            <div className="flex">
                                <div className="min-w-48 pt-20">
                                    <Icon color="action">home</Icon>
                                </div>
                                <TextField
                                    className="mb-24"
                                    label="Address"
                                    id="address"
                                    name="address"
                                    value={form.address}
                                    variant="outlined"
                                    fullWidth
                                />
                            </div>

                            <div className="flex">
                                <div className="min-w-48 pt-20">
                                    <Icon color="action">note</Icon>
                                </div>
                                <TextField
                                    className="mb-24"
                                    label="Notes"
                                    id="notes"
                                    name="notes"
                                    value={form.notes}
                                    variant="outlined"
                                    multiline
                                    rows={5}
                                    fullWidth
                                />
                            </div>
                            <ReadOnlyField title="Tipo de usuario" value={record?.partner_type}/>
                            <ReadOnlyField title="Tipo de documento" value={record?.doc_type}/>
                            <ReadOnlyField title="Número de documento" value={record?.doc_number}/>
                            <ReadOnlyField title="Apellido paterno" value={record?.first_name}/>
                            <ReadOnlyField title="Apellido materno" value={record?.last_name}/>
                            <ReadOnlyField title="Nombres" value={record?.name}/>
                            <ReadOnlyField title="Fecha de nacimiento" value={record?.dob}/>
                            <ReadOnlyField title="Tipo de seguro" value={record?.assurance}/>
                        </CardContent>
                    </Card>
                </FuseAnimateGroup>
            </div>

            <div className="flex flex-col flex-1 md:pr-32">
                <FuseAnimateGroup
                    enter={{
                        animation: "transition.slideUpBigIn"
                    }}
                >
                    <Card className="w-full mb-16">
                        <AppBar position="static" elevation={0}>
                            <Toolbar className="pl-16 pr-8">
                                <Typography variant="subtitle1" color="inherit" className="flex-1">
                                    Datos laborales
                                </Typography>
                            </Toolbar>
                        </AppBar>
                        <CardContent>
                            <ReadOnlyField title="Dirección" value={record?.address}/>
                            <ReadOnlyField title="Celular" value={record?.cellphone}/>
                            <ReadOnlyField title="Correo electrónico" value={record?.email}/>
                        </CardContent>
                    </Card>

                    <Card className="w-full mb-16">
                        <AppBar position="static" elevation={0}>
                            <Toolbar className="pl-16 pr-8">
                                <Typography variant="subtitle1" color="inherit" className="flex-1">
                                    Datos de salud
                                </Typography>
                            </Toolbar>
                        </AppBar>
                        <CardContent>
                            <ReadOnlyField title="¿Posee declaración jurada de salud?" value={record?.hasHealth}/>
                            <ReadOnlyField title="¿Posee declaración jurada de sintomatología?" value={record?.hastSymptoms}/>
                            <ReadOnlyField title="Seguimiento de estado de salud" value={record?.email}/>
                        </CardContent>
                    </Card>
                </FuseAnimateGroup>
            </div>

            <div className="flex flex-col flex-1">
                <FuseAnimateGroup
                    enter={{
                        animation: "transition.slideUpBigIn"
                    }}
                >
                    <Card className="w-full mb-16">
                        <AppBar position="static" elevation={0}>
                            <Toolbar className="pl-16 pr-8">
                                <Typography variant="subtitle1" color="inherit" className="flex-1">
                                    Datos laborales
                                </Typography>
                            </Toolbar>
                        </AppBar>
                        <CardContent>
                            <ReadOnlyField title="Dirección" value={record?.address}/>
                            <ReadOnlyField title="Celular" value={record?.cellphone}/>
                            <ReadOnlyField title="Correo electrónico" value={record?.email}/>
                        </CardContent>
                    </Card>

                    <Card className="w-full mb-16">
                        <AppBar position="static" elevation={0}>
                            <Toolbar className="pl-16 pr-8">
                                <Typography variant="subtitle1" color="inherit" className="flex-1">
                                    Datos de salud
                                </Typography>
                            </Toolbar>
                        </AppBar>
                        <CardContent>
                            <ReadOnlyField title="¿Posee declaración jurada de salud?" value={record?.hasHealth}/>
                            <ReadOnlyField title="¿Posee declaración jurada de sintomatología?" value={record?.hastSymptoms}/>
                            <ReadOnlyField title="Seguimiento de estado de salud" value={record?.email}/>
                        </CardContent>
                    </Card>
                </FuseAnimateGroup>
            </div>
        </form>
        </FormProvider> */}
    </div>
);
}

export default withReducer('partnerApp', reducer)(FormContent);