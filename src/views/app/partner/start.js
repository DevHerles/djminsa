import * as Yup from 'yup';
import { withFormik } from "formik";
import { bindActionCreators } from "redux";
import { injectIntl } from "react-intl";

import { connect } from "react-redux";

import {
    addPartnerAction,
    getPartnerList,
    getPartnerListWithOrder,
    getPartnerListSearch,
    selectedPartnerItemsChange
} from "../../../redux/partner/actions";

import PartnerFormComponent from "./form";

// https://github.com/jquense/yup#mixedwhenkeys-string--arraystring-builder-object--value-schema-schema-schema
const PartnerSchema = Yup.object().shape({
    q1: Yup.string().required("Por favor seleccione una opción"),
    q2: Yup.string().required("Por favor seleccione una opción"),
    q3: Yup.string().required("Por favor seleccione una opción"),
    q4: Yup.string().required("Por favor seleccione una opción"),
    q5: Yup.string().required("Por favor seleccione una opción"),
    q6: Yup.string().required("Por favor seleccione una opción"),
    q7: Yup.string().required("Por favor seleccione una opción"),
    q8: Yup.string().required("Por favor seleccione una opción"),
    q9: Yup.string().required("Por favor seleccione una opción"),
    q10: Yup.string().required("Por favor seleccione una opción"),
    q11: Yup.string().required("Por favor seleccione una opción"),
    q12: Yup.string().required("Por favor seleccione una opción"),
    q12_detail: Yup.string().when('q12', {
        is: 'si', then: Yup.string().required("Por favor especifique otros").min(10, 'Mínimo 10 caracteres.')
        .max(254, 'Máximo 254 caracteres.')}),
    q13: Yup.bool().oneOf([true], "Por favor seleccione esta opción"),
});

const formikEnhancer = withFormik({
    validationSchema: () => PartnerSchema,
    enableReinitialize: true,
    mapPropsToValues: (props) => props.data.new,
    handleSubmit: (values, formikBag) => {
        formikBag.setSubmitting(false);
        formikBag.props.addPartnerAction(values);
    },
    displayName: "Partner Form",
})(PartnerFormComponent);

const maptStateToProps = (state) => ({
    data: state.partner,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    addPartnerAction,
    getPartnerList,
    getPartnerListWithOrder,
    getPartnerListSearch,
    selectedPartnerItemsChange
}, dispatch);

const PartnerForm = connect(
    maptStateToProps, mapDispatchToProps
)(formikEnhancer)

export default injectIntl(PartnerForm);