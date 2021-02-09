import React, { useState, useEffect } from "react";
import { Paper, Grid, TextField, withStyles, FormControl, InputLabel, Select, MenuItem, Button, FormHelperText } from "@material-ui/core";
import useForm from "./useForm";
import { connect } from "react-redux";
import * as actions from "../../actions/dAuthenticate";
import { useToasts } from "react-toast-notifications";

const styles = theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            minWidth: 230,
        }
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 230,
    },
    smMargin: {
        margin: theme.spacing(1)
    }
})

const initialFieldValues = {
    docType: '',
    docNumber: '',
    dob: '',
}

const DAuthenticationForm = ({ classes, ...props }) => {

    //toast msg.
    const { addToast } = useToasts()

    //validate()
    //validate({docNumber:'jenny'})
    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('docType' in fieldValues)
            temp.docType = fieldValues.docType ? "" : "This field is required."
        if ('docNumber' in fieldValues)
            temp.docNumber = fieldValues.docNumber ? "" : "This field is required."
        if ('dob' in fieldValues)
            temp.dob = fieldValues.dob ? "" : "This field is required."
        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFieldValues, validate, props.dUser)

    //material-ui select
    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);
    React.useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            const onSuccess = () => {
                resetForm();
                addToast("Submitted successfully", { appearance: 'success' });
            }
            const onFailure = () => {
                addToast("Submitted failure", { appearance: 'error' });
            }
            if (props.dUser != null)
                props.loginUser(values, onSuccess, onFailure)
        }
    }

    useEffect(() => {
        if (props.dUser != null) {
            setValues({
                ...props.dUser = props.dUser,
            })
            setErrors({})
        }
    }, [props.dUser])

    return (
        <Paper className={classes.paper} elevation={3}>
            <Grid container>
                <Grid item xs={6}>
                    <form autoComplete="off" noValidate className={classes.root} onSubmit={handleSubmit}>
                        <Grid container>
                            <Grid item xs={6}>
                                <FormControl variant="outlined"
                                    className={classes.formControl}
                                    {...(errors.docType && { error: true })}
                                >
                                    <InputLabel ref={inputLabel}>Tipo de documento</InputLabel>
                                    <Select
                                        name="docType"
                                        value={values.docType}
                                        onChange={handleInputChange}
                                        labelWidth={labelWidth}
                                    >
                                        <MenuItem value="">Seleccion tipo de documento</MenuItem>
                                        <MenuItem value="1">DNI</MenuItem>
                                        <MenuItem value="2">CARNÉ DE EXTRANJERÍA</MenuItem>
                                        <MenuItem value="3">PASAPORTE</MenuItem>
                                        <MenuItem value="4">PTP</MenuItem>
                                        <MenuItem value="5">PERMISO DE REFUGIO</MenuItem>
                                    </Select>
                                    {errors.docType && <FormHelperText>{errors.docType}</FormHelperText>}
                                </FormControl>
                                <TextField
                                    name="docNumber"
                                    InputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                    variant="outlined"
                                    label="Número de documento"
                                    value={values.docNumber}
                                    onChange={handleInputChange}
                                    {...(errors.docNumber && { error: true, helperText: errors.docNumber })}
                                />
                                <TextField
                                    name="dob"
                                    type="date"
                                    variant="outlined"
                                    label="Fecha de nacimiento"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={values.dob}
                                    onChange={handleInputChange}
                                    {...(errors.dob && { error: true, helperText: errors.dob })}
                                />
                                <div>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                        className={classes.smMargin}
                                    >
                                        Ingresar
                        </Button>
                                </div>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
            </Grid>
        </Paper>
    );
}


const mapStateToProps = state => ({
    dUser: state.dAuthentication.user
})

const mapActionToProps = {
    loginUser: actions.login,
    logoutUser: actions.logout,
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(DAuthenticationForm));