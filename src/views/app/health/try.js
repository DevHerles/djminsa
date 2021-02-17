import * as Yup from 'yup';
import { withFormik, Form } from "formik";
import { bindActionCreators } from "redux";

import { connect } from "react-redux";
import * as React from "react";

import { Row, Card, CardBody, FormGroup, Label, Button } from "reactstrap";

import {
    FormikRadioButtonGroup,
} from "../../../containers/form-validations/FormikFields";
import {
    addHealth,
} from "../../../redux/health/actions";

const HealthSchema = Yup.object().shape({
    q1: Yup.string().required("Por favor seleccion una opción"),
    q2: Yup.string().required("Por favor seleccion una opción"),
    q3: Yup.string().required("Por favor seleccion una opción"),
    q4: Yup.string().required("Por favor seleccion una opción"),
    // q5: Yup.string().required("Por favor seleccion una opción"),
    // q6: Yup.string().required("Por favor seleccion una opción"),
    // q7: Yup.string().required("Por favor seleccion una opción"),
    // q8: Yup.string().required("Por favor seleccion una opción"),
    // q9: Yup.string().required("Por favor seleccion una opción"),
    // q10: Yup.string().required("Por favor seleccion una opción"),
    // q11: Yup.string().required("Por favor seleccion una opción"),
    // q12: Yup.string().required("Por favor seleccion una opción"),
    // q12_detail: Yup.string().required("Por favor especifique otros"),
});

const options = [
    { value: "si", label: "SI" },
    { value: "no", label: "NO" },
];

const questions = [
    { id: "q1", label: "1. Hipertensión arterial no controlada (*)"},
    { id: "q2", label: "2. Enfermedades cardiovasculares graves (*)"},
    { id: "q3", label: "3. Diabetes Mellitus (*)"},
    { id: "q4", label: "4. Obesidad con IMC de 40 a mas (*)"},
    // { id: "q5", label: "5. Cáncer (*)"},
    // { id: "q6", label: "6. Asma moderada o grave (*)"},
    // { id: "q7", label: "7. Enfermedad pulmonar crónica (*)"},
    // { id: "q8", label: "8. Insuficiencia renal crónica en tratamiento con hemodiálisis (*)"},
    // { id: "q9", label: "9. Enfermedad o tratamiento inmunosupresor (*)"},
    // { id: "q10", label: "10. Edad mayor de 65 años (*)"},
    // { id: "q11", label: "11. Gestación (*)"},
    // { id: "q12", label: "12. Otros (*)"},
];

class MyCustomComponent extends React.Component {
    render() {
        const {
            values,
            // handleSubmit,
            isSubmitting,
            isValid,
            // handleChange,
            // handleBlur,
            setFieldValue,
            setFieldTouched,
            errors,
            touched
        } = this.props;

        return(
            <Form className="av-tooltip tooltip-label-right">
                {
                    questions.map(question => {
                        return (
                            <FormGroup className="error-l-150" key={question.id}>
                                <Label className="d-block">{question.label} </Label>
                                <FormikRadioButtonGroup
                                    inline
                                    name={question.id}
                                    id={question.id}
                                    value={eval(`values.${question.id}`)}
                                    onChange={setFieldValue}
                                    onBlur={setFieldTouched}
                                    options={options}
                                />
                                {eval(`errors.${question.id}`) && eval(`touched.${question.id}`) ? (
                                    <div className="invalid-feedback d-block">
                                    {eval(`errors.${question.id}`)}
                                    </div>
                                ) : null}
                            </FormGroup>
                        );
                    })
                }
                
                <Button type="submit" disabled={isSubmitting || !isValid}>Submit</Button>
            </Form>
        );
    }
}

const formikEnhancer = withFormik({
    validationSchema: HealthSchema,
    enableReinitialize: true,
    mapPropsToValues: (props) => props.newHealth,
    handleSubmit: (values, formikBag) => {
        console.log(values);
        formikBag.setSubmitting(false);
        formikBag.props.addHealth(values);
    },
    displayName: "Health Form",
})(MyCustomComponent);

const maptStateToProps = (state) => ({
    newHealth: state.health.newHealth,
    //healthList: state.health.healthList,
});

// const mapDispatchToProps = (dispatch) => ({
//     updateRenderKey: (values) => {
//         dispatch(addHealth(values))
//     }
// });

const mapDispatchToProps = dispatch => bindActionCreators({
    addHealth,
}, dispatch);

const Redux = connect(
    maptStateToProps, mapDispatchToProps
)(formikEnhancer)

// const Redux = connect(
//     maptStateToProps,
//     dispatch => bindActionCreators(addHealth, dispatch)
// )(formikEnhancer);

export default Redux;