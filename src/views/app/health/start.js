import React, { Fragment, Component } from "react";
import { Formik, Form, Field } from "formik";
import { connect } from "react-redux";
import * as Yup from "yup";
import {
    FormikRadioButtonGroup,
} from "../../../containers/form-validations/FormikFields";
import { Row, Card, CardBody, FormGroup, Label, Button } from "reactstrap";
import { Colxx } from "../../../components/common/CustomBootstrap";

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

//const Start = ({health, onInputChange, onFormSubmit}) => (
class Start extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            q1: "",
            q2: "",
            q3: "",
            q4: "",
            q5: "",
            q6: "",
            q7: "",
            q8: "",
            q9: "",
            q10: "",
            q11: "",
            q12: "",
            q12_detail: "",
        };
    }

    handleSubmit = (values) => {
        console.log(values);
    }

    onUserLogin(values) {
        //if (this.state.email !== "" && this.state.password !== "") {
          this.props.loginUser(values, this.props.history);
        //}
    }

    render() {
        console.log("xxxxx");
        return (
        <Fragment>
            <Row className="mb-4">
              <Colxx xxs="12">
                <Card>
                    <CardBody>
                        <h6 className="mb-4">Declaración jurada de Salud</h6>
                        <Formik
                            initialValues={this.state}
                            validationSchema={HealthSchema}
                            onSubmit={this.onUserLogin}
                        >
                            {({
                                setFieldValue,
                                setFieldTouched,
                                values,
                                errors,
                                touched                            }) => (
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
                                <FormGroup className="error-l-150">
                                    <Label>Especifique otros</Label>
                                    <Field
                                        className="form-control"
                                        name="q12_detail"
                                        id="q12_detail"
                                        value={values.q12_detail}
                                        component="textarea" />
                                    {errors.q12_detail  && touched.q12_detail ? (
                                        <div className="invalid-feedback d-block">
                                        {errors.q12_detail}
                                        </div>
                                    ) : null}
                                </FormGroup>

                                <Button color="primary" type="submit">
                                    Declarar
                                </Button>
                            </Form>
                            )}
                        </Formik>
                    </CardBody>
                </Card>
              </Colxx>
            </Row>
        </Fragment>
        )
    }
};

const mapStateToProps = ({ newHealth }) => {
    console.log('zazazazaz');
    return {
        newHealth: {name: "name", code: "code"}
    };
};

export default connect(
    mapStateToProps,
    {
        loginUser
    }
)(Start);