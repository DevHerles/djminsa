import React, { Component, Fragment } from 'react';
import { Form } from "formik";

import { Row, Card, CardBody, FormGroup, Label, Button } from "reactstrap";
import { Colxx, Separator } from "../../../components/common/CustomBootstrap";
import {
    FormikRadioButtonGroup,
} from "../../../containers/form-validations/FormikFields";
import Breadcrumb from "../../../containers/navs/Breadcrumb";

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

class HealthFormComponent extends Component {
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
            <Fragment>
            <Row>
              <Colxx xxs="12">
                <Breadcrumb heading="menu.health" match={this.props.match} />
                <Separator className="mb-5" />
              </Colxx>
            </Row>
            <Row className="mb-4">
                <Colxx xxs="12">
                    <Card>
                        <CardBody>
                            <h6 className="mb-4">Declaración jurada de Salud</h6>
                            <Form className="av-tooltip tooltip-label-right">
                                {
                                    questions.map(question => {
                                        return (
                                            <Fragment>
                                            <Card>
                                                <CardBody>
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
                                                </CardBody>
                                            </Card>
                                            <br></br>
                                            </Fragment>
                                        );
                                    })
                                }

                                <Button type="submit" disabled={isSubmitting || !isValid}>Declarar</Button>
                            </Form>
                        </CardBody>
                    </Card>
                </Colxx>
            </Row>
        </Fragment>
        );
    }
}
export default HealthFormComponent;
