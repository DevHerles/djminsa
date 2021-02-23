import * as Yup from 'yup';
import { withFormik } from "formik";
import { bindActionCreators } from "redux";
import { injectIntl } from "react-intl";

import { connect } from "react-redux";

import {
    addPartnerAction,
    addPartnerItem,
    getPartnerList,
    getPartnerListWithOrder,
    getPartnerListSearch,
    selectedPartnerItemsChange
} from "../../../redux/partner/actions";

import FormComponent from "./newUpdateForm";

// https://github.com/jquense/yup#mixedwhenkeys-string--arraystring-builder-object--value-schema-schema-schema
const FormSchema = Yup.object().shape({
    partner_type: Yup.string().required("Por favor seleccione una opción"),
    doc_type: Yup.string().required("Por favor seleccione una opción"),
    doc_number: Yup.string().required("Por favor ingrese un número de documento válido"),
    dob: Yup.string().required("Por favor seleccione una opción"),
    first_name: Yup.string().required("Por favor seleccione una opción"),
    last_name: Yup.string().required("Por favor seleccione una opción"),
    name: Yup.string().required("Por favor seleccione una opción"),
    assurance_type: Yup.string().required("Por favor seleccione una opción"),
    organ: Yup.string().required("Por favor seleccione una opción"),
    organic_unit: Yup.string().required("Por favor seleccione una opción"),
    functional_team: Yup.string().required("Por favor seleccione una opción"),
    position: Yup.string().required("Por favor seleccione una opción"),
    entailment: Yup.string().required("Por favor seleccione una opción"),
    working_mode: Yup.string().required("Por favor seleccione una opción"),
    health_status_monitoring: Yup.bool().oneOf([true], "Por favor seleccione esta opción"),
});

const formikEnhancer = withFormik({
    validationSchema: () => FormSchema,
    enableReinitialize: true,
    mapPropsToValues: (props) => props.initialValues,
    handleSubmit: (values, formikBag) => {
        formikBag.setSubmitting(false);
        formikBag.props.addPartnerItem(values);
    },
    displayName: "Partner Form",
})(FormComponent);

const maptStateToProps = state => ({
    initialValues: state.partner.new,
    addError: state.partner.error,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    addPartnerAction,
    addPartnerItem,
    getPartnerList,
    getPartnerListWithOrder,
    getPartnerListSearch,
    selectedPartnerItemsChange
}, dispatch);

const PartnerForm = connect(
    maptStateToProps, mapDispatchToProps
)(formikEnhancer)

export default injectIntl(PartnerForm);