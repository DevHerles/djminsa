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

import NewEditFormComponent from "./newUpdateForm";

// https://github.com/jquense/yup#mixedwhenkeys-string--arraystring-builder-object--value-schema-schema-schema
const PartnerSchema = Yup.object().shape({
    // partnerType: Yup.string().required("Por favor seleccione una opción"),
    // docType: Yup.string().required("Por favor seleccione una opción"),
    docNumber: Yup.string().required("Por favor ingrese un número de documento válido"),
    // dob: Yup.string().required("Por favor seleccione una opción"),
    // firstName: Yup.string().required("Por favor seleccione una opción"),
    // lastName: Yup.string().required("Por favor seleccione una opción"),
    // name: Yup.string().required("Por favor seleccione una opción"),
    // assuranceType: Yup.string().required("Por favor seleccione una opción"),
    // organ: Yup.string().required("Por favor seleccione una opción"),
    // organicUnit: Yup.string().required("Por favor seleccione una opción"),
    // functionalTeam: Yup.string().required("Por favor seleccione una opción"),
    // position: Yup.string().required("Por favor seleccione una opción"),
    // entailment: Yup.string().required("Por favor seleccione una opción"),
    // workingMode: Yup.string().required("Por favor seleccione una opción"),
    // healthStatusMonitoring: Yup.bool().oneOf([true], "Por favor seleccione esta opción"),
});

const formikEnhancer = withFormik({
    validationSchema: () => PartnerSchema,
    enableReinitialize: true,
    mapPropsToValues: (props) => props.partnerApp,
    handleSubmit: (values, formikBag) => {
        formikBag.setSubmitting(false);
        formikBag.props.addPartnerItem(values);
    },
    displayName: "Partner Form",
})(NewEditFormComponent);

const maptStateToProps = state => ({
    partnerApp: state.partner.newPartner,
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