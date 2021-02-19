import * as Yup from 'yup';
import { withFormik } from "formik";
import { bindActionCreators } from "redux";

import { connect } from "react-redux";

import {
    addSymptomsAction,
} from "../../../redux/symptoms/actions";

import SymptomsFormComponent from "./form";

// https://github.com/jquense/yup#mixedwhenkeys-string--arraystring-builder-object--value-schema-schema-schema
const SymptomsSchema = Yup.object().shape({
    q1: Yup.string().required("Por favor seleccione una opción"),
    q2: Yup.string().required("Por favor seleccione una opción"),
    q3: Yup.string().required("Por favor seleccione una opción"),
    q4: Yup.string().required("Por favor seleccione una opción"),
    q5: Yup.string().required("Por favor seleccione una opción"),
    q6: Yup.string().required("Por favor seleccione una opción"),
    q6_detail: Yup.string().when('q6', {
        is: 'si', then: Yup.string().required("Por favor especifique otros").min(10, 'Mínimo 10 caracteres.')
        .max(254, 'Máximo 254 caracteres.')}),
    q7: Yup.bool().oneOf([true], "Por favor seleccione esta opción"),
});

const formikEnhancer = withFormik({
    validationSchema: () => SymptomsSchema,
    enableReinitialize: true,
    mapPropsToValues: (props) => props.newSymptoms,
    handleSubmit: (values, formikBag) => {
        formikBag.setSubmitting(false);
        formikBag.props.addSymptomsAction(values);
    },
    displayName: "Symptoms Form",
})(SymptomsFormComponent);

const maptStateToProps = (state) => ({
    newSymptoms: state.symptoms.newSymptoms,
    symptoms: state.symptoms.symptoms,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    addSymptomsAction,
}, dispatch);

const SymptomsForm = connect(
    maptStateToProps, mapDispatchToProps
)(formikEnhancer)

export default SymptomsForm;