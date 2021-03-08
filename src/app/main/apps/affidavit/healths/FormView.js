import React, {useEffect, useState, Fragment} from 'react';
import {Button, Tab, Tabs, Icon, Typography} from '@material-ui/core';
import {orange} from '@material-ui/core/colors';
import {makeStyles} from '@material-ui/styles';
import {FuseAnimate, FusePageCarded, FuseUtils} from '@fuse';
import {SimpleItem} from '@asf';
import {useForm} from '@fuse/hooks';
import {Link} from 'react-router-dom';
import _ from '@lodash';
import {useDispatch, useSelector} from 'react-redux';
import withReducer from 'app/store/withReducer';
import * as Actions from './store/actions';
import reducer from './store/reducers';

const useStyles = makeStyles(theme => ({
    productImageFeaturedStar: {
        position: 'absolute',
        top     : 0,
        right   : 0,
        color   : orange[400],
        opacity : 0
    },
    productImageUpload      : {
        transitionProperty      : 'box-shadow',
        transitionDuration      : theme.transitions.duration.short,
        transitionTimingFunction: theme.transitions.easing.easeInOut,
    },
    productImageItem        : {
        transitionProperty      : 'box-shadow',
        transitionDuration      : theme.transitions.duration.short,
        transitionTimingFunction: theme.transitions.easing.easeInOut,
        '&:hover'               : {
            '& $productImageFeaturedStar': {
                opacity: .8
            }
        },
        '&.featured'            : {
            pointerEvents                      : 'none',
            boxShadow                          : theme.shadows[3],
            '& $productImageFeaturedStar'      : {
                opacity: 1
            },
            '&:hover $productImageFeaturedStar': {
                opacity: 1
            }
        }
    }
}));


const questions = [
    { id: "q1", label: "1. Hipertensión arterial no controlada (*)" },
    { id: "q2", label: "2. Enfermedades cardiovasculares graves (*)" },
    { id: "q3", label: "3. Diabetes Mellitus (*)" },
    {
      id: "q4",
      label: "4. Obesidad con IMC de 40 a mas (*)",
      help:
        "El índice de masa corporal (IMC) se determina usando la formula peso(kg) / estatura(m)^2 Ejemplo: Peso 68 kg, Estatura = 1.66 m, Cálculo IMC = 68 / (1.65)(1.65) = 24.98",
    },
    { id: "q5", label: "5. Cáncer (*)" },
];

const questions1 = [
    { id: "q6", label: "6. Asma moderada o grave (*)" },
    { id: "q7", label: "7. Enfermedad pulmonar crónica (*)" },
    {
      id: "q8",
      label: "8. Insuficiencia renal crónica en tratamiento con hemodiálisis (*)",
    },
    { id: "q9", label: "9. Enfermedad o tratamiento inmunosupresor (*)" },
    { id: "q10", label: "10. Edad mayor de 65 años (*)" },
    { id: "q11", label: "11. Gestación (*)" },
    { id: "q12", label: "12. Otros (*)" },
];

const API_PATH = 'healths';

function Health(props)
{
    const dispatch = useDispatch();
    const record = useSelector(({affidavitHealthApp}) => affidavitHealthApp.record);

    const [tabValue, setTabValue] = useState(0);
    const {form, handleChange, setForm} = useForm(null);

    useEffect(() => {
        function updateFormState()
        {
            const params = props.match.params;
            const {id} = params;

            if ( id === 'new' )
            {
                dispatch(Actions.newRecord());
            }
            else
            {
                console.log(props.match.params);
                dispatch(Actions.getById(API_PATH, id));
            }
        }

        updateFormState();
    }, [dispatch, props.match.params]);

    useEffect(() => {
        if (
            (record.data && !form) ||
            (record.data && form && record.data.id !== form.id)
        )
        {
            setForm(record.data);
        }
    }, [form, record.data, setForm]);

    function handleChangeTab(tabValue)
    {
        setTabValue(tabValue);
    }

    function canBeSubmitted()
    {
        return true;
        return (
            form.name.length > 0 &&
            !_.isEqual(record.data, form)
        );
    }

    return (
        <FusePageCarded
            classes={{
                toolbar: "p-0",
                header : "min-h-72 h-72 sm:h-136 sm:min-h-136"
            }}
            header={
                form && (
                    <div className="flex flex-1 w-full items-center justify-between">

                        <div className="flex flex-col items-start max-w-full">

                            <FuseAnimate animation="transition.slideRightIn" delay={300}>
                                <Typography className="normal-case flex items-center sm:mb-12" component={Link} role="button" to="/apps/affidavit/healths" color="inherit">
                                    <Icon className="mr-4 text-20">arrow_back</Icon>
                                    Mis declaraciones juradas de salud
                                </Typography>
                            </FuseAnimate>

                            {/* <div className="flex items-center max-w-full">
                                <FuseAnimate animation="transition.expandIn" delay={300}>
                                    {form.images.length > 0 && form.featuredImageId ? (
                                        <img className="w-32 sm:w-48 mr-8 sm:mr-16 rounded" src={_.find(form.images, {id: form.featuredImageId}).url} alt={form.name}/>
                                    ) : (
                                        <img className="w-32 sm:w-48 mr-8 sm:mr-16 rounded" src="assets/images/ecommerce/product-image-placeholder.png" alt={form.name}/>
                                    )}
                                </FuseAnimate>
                                <div className="flex flex-col min-w-0">
                                    <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                        <Typography className="text-16 sm:text-20 truncate">
                                            {form.name ? form.name : 'New Health'}
                                        </Typography>
                                    </FuseAnimate>
                                    <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                        <Typography variant="caption">Health Detail</Typography>
                                    </FuseAnimate>
                                </div>
                            </div> */}
                        </div>
                        <FuseAnimate animation="transition.slideRightIn" delay={300}>
                            <Button
                                className="whitespace-no-wrap"
                                variant="contained"
                                disabled={!canBeSubmitted()}
                                onClick={() => dispatch(Actions.create(API_PATH, form))}
                            >
                                Save
                            </Button>
                        </FuseAnimate>
                    </div>
                )
            }
            contentToolbar={
                <Tabs
                    value={tabValue}
                    onChange={handleChangeTab}
                    indicatorColor="secondary"
                    textColor="secondary"
                    variant="scrollable"
                    scrollButtons="auto"
                    classes={{root: "w-full h-64"}}
                >
                    <Tab className="h-64 normal-case" label="Basic Info"/>
                </Tabs>
            }
            content={
                form && (
                    <div className="p-16 sm:p-24 max-w-2xl">
                        {tabValue === 0 &&
                        (
                            <div>
                                {questions.map((question) => {
                                    return(
                                        <Fragment>
                                            <SimpleItem key={`_index_${question.id}`} title={question.label} onChange={handleChange} value={eval(`form.${question.id}`)} field={question.id}/>

                                        </Fragment>
                                    );
                                })}
                                {questions1.map((question) => {
                                    return(
                                        <Fragment>
                                            <SimpleItem key={`_index_${question.id}`} title={question.label} onChange={handleChange} value={eval(`form.${question.id}`)} field={question.id}/>

                                        </Fragment>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                )
            }
            innerScroll
        />
    )
}

export default withReducer('affidavitHealthApp', reducer)(Health);
