import React, { Component } from 'react';
import { Fragment } from 'react';
import { Colxx, Separator } from "../../../components/common/CustomBootstrap";
import Breadcrumb from "../../../containers/navs/Breadcrumb";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { withFormik } from "formik";
import {
    addHealth,
} from "../../../redux/health/actions";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
    FormikRadioButtonGroup,
} from "../../../containers/form-validations/FormikFields";
import { Row, Card, CardBody, FormGroup, Label, Button } from "reactstrap";

import { loginUser } from "../../../redux/actions";


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
    q12_detail: Yup.string().required("Por favor especifique otros"),
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
    { id: "q5", label: "5. Cáncer (*)"},
    { id: "q6", label: "6. Asma moderada o grave (*)"},
    { id: "q7", label: "7. Enfermedad pulmonar crónica (*)"},
    { id: "q8", label: "8. Insuficiencia renal crónica en tratamiento con hemodiálisis (*)"},
    { id: "q9", label: "9. Enfermedad o tratamiento inmunosupresor (*)"},
    { id: "q10", label: "10. Edad mayor de 65 años (*)"},
    { id: "q11", label: "11. Gestación (*)"},
    { id: "q12", label: "12. Otros (*)"},
];

class HealthForm extends Component {
    render() {
        const {
            errors,
            handleSubmit,
            isSubmitting,
            values,
            setFieldValue,
            setFieldTouched
        } = this.props;
        console.log(this.props);
        return (
            <Fragment>
            <Row className="mb-4">
              <Colxx xxs="12">
                <Card>
                    <CardBody>
                        <h6 className="mb-4">Declaración jurada de Salud</h6>
                        <form onSubmit={handleSubmit} className="av-tooltip tooltip-label-right">
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
                            <FormGroup className="error-l-150">
                                <Label>Especifique otros</Label>
                                <Field
                                    className="form-control"
                                    name="q12_detail"
                                    id="q12_detail"
                                    value={values.q12_detail}
                                    component="textarea" />
                                {errors.q12_detail ? (
                                    <div className="invalid-feedback d-block">
                                    {errors.q12_detail}
                                    </div>
                                ) : null}
                            </FormGroup>

                            <Button color="primary" type="submit" disabled={isSubmitting}>
                                Declarar
                            </Button>
                        </form>
                    </CardBody>
                </Card>
              </Colxx>
            </Row>
        </Fragment>
        );
    }
}

const healthFormFormik = withFormik({
    validationSchema: HealthSchema,
    mapPropsToValues: () => ({
        q1: "si",
        q2: "no",
        q3: "si",
    }),
    handleSubmit(values, { props, setSubmitting }) {
        console.log(values);
        props.addHealth(values);
        setSubmitting(false);
    },
    displayName: 'Healt Form',
})(HealthForm);

const mapStateToProps = ({ state }) => {
    return {
        state
    };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
    addHealth
}, dispatch);

const Redux = connect(
    state => state.health,
    dispatch => bindActionCreators(addHealth, dispatch)
)(healthFormFormik);

export default Redux;