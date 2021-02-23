import { Field, Form } from "formik";
import React, { Component, Fragment } from "react";
import {
  Alert,
  Button,
  Card,
  CardBody,
  FormGroup,
  Label,
  Row,
  UncontrolledAlert,
} from "reactstrap";

import {
  Colxx,
  Separator,
} from "../../../../components/common/CustomBootstrap";
import {
  FormikCustomCheckbox,
  FormikRadioButtonGroup,
} from "../../../../containers/form-validations/FormikFields";
import Breadcrumb from "../../../../containers/navs/Breadcrumb";

const options = [
  { value: "si", label: "SI" },
  { value: "no", label: "NO" },
];

const questions = [
  { id: "q1", label: "1. Hipertensión arterial no controlada (*)" },
  { id: "q2", label: "2. Enfermedades cardiovasculares graves (*)" },
  { id: "q3", label: "3. Diabetes Mellitus (*)" },
  {
    id: "q4",
    label: "4. Obesidad con IMC de 40 a mas (*)",
    help:
      "El índice de masa corporal (IMC) se determina usando la formula peso(kg) / estatura(m)^2 Ejemplo: Peso 68 kg, Estatura = 1.66 m, Cálculo IMC = 68 / (1.65)(1.65) = 24.98",
  },
  { id: "q5", label: "5. Cáncer (*)" },
  { id: "q6", label: "6. Asma moderada o grave (*)" },
  { id: "q7", label: "7. Enfermedad pulmonar crónica (*)" },
  {
    id: "q8",
    label: "8. Insuficiencia renal crónica en tratamiento con hemodiálisis (*)",
  },
  { id: "q9", label: "9. Enfermedad o tratamiento inmunosupresor (*)" },
  { id: "q10", label: "10. Edad mayor de 65 años (*)" },
  { id: "q11", label: "11. Gestación (*)" },
  { id: "q12", label: "12. Otros (*)" },
];

class HealthFormComponent extends Component {
  render() {
    const {
      values,
      isSubmitting,
      isValid,
      setFieldValue,
      setFieldTouched,
      errors,
      touched,
    } = this.props;

    return (
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
                <UncontrolledAlert color="danger" align="center" fade={false}>
                  <h5>
                    Todos los datos expresados en esta ficha constituyen
                    declaración jurada de mi parte. He sido informado que de
                    omitir o declarar informacion falsa puedo perjudicar la
                    salud de mis compañeros de trabajo, y la mia propia,
                    asumiendo las responsabilidades que correspondan.
                  </h5>
                </UncontrolledAlert>
                <Alert color="success" align="center">
                  <h5>
                    Por medio de la presente DECLARO BAJO JURAMENTO encontrarme
                    dentro del grupo de servidores con riesgo vulnerable por
                    tener:
                  </h5>
                </Alert>
                <Form className="av-tooltip tooltip-label-right">
                  {questions.map((question, index) => {
                    return (
                      <Fragment key={`question_${index}`}>
                        <Card key={question.id}>
                          <CardBody key={question.id}>
                            <FormGroup
                              className="error-l-250"
                              key={question.id}
                            >
                              <Label className="d-block">
                                <h4>{question.label}</h4>
                              </Label>
                              {question.help !== undefined ? (
                                <Label className="d-block">
                                  <h6>
                                    <Alert color="info">{question.help}</Alert>
                                  </h6>
                                </Label>
                              ) : null}
                              <h4>
                                <FormikRadioButtonGroup
                                  inline
                                  name={question.id}
                                  id={question.id}
                                  value={eval(`values.${question.id}`)}
                                  onChange={setFieldValue}
                                  onBlur={setFieldTouched}
                                  options={options}
                                />
                              </h4>
                              {eval(`errors.${question.id}`) &&
                              eval(`touched.${question.id}`) ? (
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
                  })}
                  {values.q12 === "si" ? (
                    <h5>
                      <FormGroup className="error-l-250">
                        <Label>Especifique otros (*)</Label>
                        <Field
                          className="form-control"
                          name="q12_detail"
                          id="q12_detail"
                          value={values.q12_detail}
                          component="textarea"
                        />
                        {errors.q12_detail && touched.q12_detail ? (
                          <div className="invalid-feedback d-block">
                            <h5>{errors.q12_detail}</h5>
                          </div>
                        ) : null}
                      </FormGroup>
                    </h5>
                  ) : null}
                  <FormGroup className="error-l-250">
                    <h4>
                      <FormikCustomCheckbox
                        name="q13"
                        value={values.q13}
                        label="He leído y confirmo la Declaración Jurada de Salud (*)"
                        onChange={setFieldValue}
                        onBlur={setFieldTouched}
                      />
                    </h4>
                    {errors.q13 && touched.q13 ? (
                      <div className="invalid-feedback d-block">
                        <h5>{errors.q13}</h5>
                      </div>
                    ) : null}
                  </FormGroup>
                  <br></br>
                  {!isValid ? (
                    <UncontrolledAlert color="danger" fade={false}>
                      <h5>Todos los campos marcados con(*) son requeridos.</h5>
                    </UncontrolledAlert>
                  ) : null}
                  <Button type="submit" disabled={isSubmitting || !isValid}>
                    Declarar
                  </Button>
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
