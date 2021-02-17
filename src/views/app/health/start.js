import * as Yup from 'yup';
import { withFormik, Form } from "formik";
import { bindActionCreators } from "redux";

import { connect } from "react-redux";
import * as React from "react";

import {
    addHealthAction,
} from "../../../redux/health/actions";

import HealthFormComponent from "./form";

const HealthSchema = Yup.object().shape({
    q1: Yup.string().required("Por favor seleccion una opción"),
    q2: Yup.string().required("Por favor seleccion una opción"),
    q3: Yup.string().required("Por favor seleccion una opción"),
    q4: Yup.string().required("Por favor seleccion una opción"),
    q5: Yup.string().required("Por favor seleccion una opción"),
    q6: Yup.string().required("Por favor seleccion una opción"),
    q7: Yup.string().required("Por favor seleccion una opción"),
    q8: Yup.string().required("Por favor seleccion una opción"),
    q9: Yup.string().required("Por favor seleccion una opción"),
    q10: Yup.string().required("Por favor seleccion una opción"),
    q11: Yup.string().required("Por favor seleccion una opción"),
    q12: Yup.string().required("Por favor seleccion una opción"),
    // q12_detail: Yup.string().required("Por favor especifique otros"),
});

const formikEnhancer = withFormik({
    validationSchema: HealthSchema,
    enableReinitialize: true,
    mapPropsToValues: (props) => props.newHealth,
    handleSubmit: (values, formikBag) => {
        console.log(values);
        formikBag.setSubmitting(false);
        formikBag.props.addHealthAction(values);
    },
    displayName: "Health Form",
})(HealthFormComponent);

const maptStateToProps = (state) => ({
    newHealth: state.health.newHealth,
    healths: state.health.healths,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    addHealthAction,
}, dispatch);

const HealtForm = connect(
    maptStateToProps, mapDispatchToProps
)(formikEnhancer)

export default HealtForm;