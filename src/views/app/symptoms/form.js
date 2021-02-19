import React, { Component, Fragment } from 'react';
import { Form, Field } from "formik";

import { Alert, Row, Card, CardBody, FormGroup, Label, Button, UncontrolledAlert,
} from "reactstrap";
import { Colxx, Separator } from "../../../components/common/CustomBootstrap";
import {
    FormikRadioButtonGroup,
    FormikCustomCheckbox,
} from "../../../containers/form-validations/FormikFields";
import Breadcrumb from "../../../containers/navs/Breadcrumb";

const options = [
    { value: "si", label: "SI" },
    { value: "no", label: "NO" },
];

const questions = [
    { id: "q1", label: "1. Sensación de alza térmica o fiebre"},
    { id: "q2", label: "2. Tos, estornudos o dificultad para respirar"},
    { id: "q3", label: "3. Expectoración o flema amarilla o verdosa"},
    { id: "q4", label: "4. Pérdida de gusto y/o olfato"},
    { id: "q5", label: "5. Contacto con persona(s) con un caso confirmado de COVID-19"},
    { id: "q6", label: "6. Está tomando alguna medicación (detallar cuál o cuáles)"},
];

class SymptomsFormComponent extends Component {
    render() {
        const {
            values,
            isSubmitting,
            isValid,
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
                            <h6 className="mb-4">Declaración Jurada de Sintomatología Covid-19</h6>
                            <UncontrolledAlert color="danger" align="center" fade={false}>
                                <h5>Todos los datos expresados en esta ficha constituyen declaración jurada de mi parte. He sido informado que de omitir o declarar informacion falsa puedo perjudicar la salud de mis compañeros de trabajo, y la mia propia, asumiendo las responsabilidades que correspondan.</h5>
                            </UncontrolledAlert>
                            <Alert color="success" align="center">
                            <h5>

FICHA DE SINTOMATOLOGÍA COVID-19 PARA EL REGRESO AL TRABAJO - DECLARACIÓN JURADA
<br></br><br></br>
En los últimos 14 días calendario ha tenido alguno de los síntomas siguientes:
</h5>
                            </Alert>
                            <Form className="av-tooltip tooltip-label-right">
                                {
                                    questions.map((question, index) => {
                                        return (
                                            <Fragment key={`question_${index}`}>
                                                <Card key={question.id}>
                                                    <CardBody key={question.id}>
                                                    <FormGroup className="error-l-250" key={question.id}>
                                                        <Label className="d-block"><h4>{question.label}</h4></Label>
                                                        {question.help !== undefined ?
                                                        <Label className="d-block"><h6><Alert color="danger">{question.help}</Alert></h6></Label>
                                                        : null}
                                                        <h4>
                                                        <FormikRadioButtonGroup
                                                            inline
                                                            name={question.id}
                                                            id={question.id}
                                                            value={eval(`values.${question.id}`)}
                                                            onChange={setFieldValue}
                                                            onBlur={setFieldTouched}
                                                            options={options}
                                                        /></h4>
                                                        {eval(`errors.${question.id}`) && eval(`touched.${question.id}`) ? (
                                                            <div className="invalid-feedback d-block">
                                                            <h5>{eval(`errors.${question.id}`)}</h5>
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
                                { (values.q6 === "si") ? 
                                    <h5>
                                    <FormGroup className="error-l-250">
                                        <Label>Detalle los medicamentos (*)</Label>
                                        <Field
                                            className="form-control"
                                            name="q6_detail"
                                            id="q6_detail"
                                            value={values.q6_detail}
                                            component="textarea" />
                                        {errors.q6_detail && touched.q6_detail ? (
                                            <div className="invalid-feedback d-block">
                                            <h5>{errors.q6_detail}</h5>
                                            </div>
                                        ) : null}
                                    </FormGroup></h5> : null}
                                <FormGroup className="error-l-250">
                                    <h4>
                                    <FormikCustomCheckbox
                                        name="q7"
                                        value={values.q7}
                                        label="He leído y confirmo la Declaración Jurada de Sintomatología (*)"
                                        onChange={setFieldValue}
                                        onBlur={setFieldTouched}
                                    />
                                    </h4>
                                    {errors.q7 && touched.q7 ? (
                                        <div className="invalid-feedback d-block">
                                        <h5>{errors.q7}</h5>
                                        </div>
                                    ) : null}
                                </FormGroup>
                                <br></br>
                                {!isValid ?
                                    <UncontrolledAlert color="danger" fade={false}>
                                        <h5>Todos los campos marcados con (*) son requeridos.</h5>
                                    </UncontrolledAlert>
                                : null}
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
export default SymptomsFormComponent;
