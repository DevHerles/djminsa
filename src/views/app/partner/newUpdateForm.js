import React, { Component, Fragment } from 'react';
import { Form, Field } from "formik";

import { Alert, Row, Card, CardBody, FormGroup, Label, Button, UncontrolledAlert,
} from "reactstrap";
import { Colxx, Separator } from "../../../components/common/CustomBootstrap";
import {
    FormikRadioButtonGroup,
    FormikCustomCheckbox,
    FormikReactSelect,
    FormikTagsInput,
    FormikDatePicker
} from "../../../containers/form-validations/FormikFields";
import Breadcrumb from "../../../containers/navs/Breadcrumb";
import IntlMessages from "../../../helpers/IntlMessages";
import { NotificationManager } from "../../../components/common/react-notifications";


import partnerForm from "../../../data/partnerForm.json";

class NewEditComponent extends Component {
    createNotification = (type, className) => {
        let cName = className || "";
        return () => {
          switch (type) {
            case "primary":
              NotificationManager.primary(
                "This is a notification!",
                "Primary Notification",
                3000,
                null,
                null,
                cName
              );
              break;
            case "secondary":
              NotificationManager.secondary(
                "This is a notification!",
                "Secondary Notification",
                3000,
                null,
                null,
                cName
              );
              break;
            case "info":
              NotificationManager.info("Info message", "", 3000, null, null, cName);
              break;
            case "success":
              NotificationManager.success(
                "Success message",
                "Title here",
                3000,
                null,
                null,
                cName
              );
              break;
            case "warning":
              NotificationManager.warning(
                "Warning message",
                "Close after 3000ms",
                3000,
                null,
                null,
                cName
              );
              break;
            case "error":
              NotificationManager.error(
                "Error message",
                "Click me!",
                5000,
                () => {
                  alert("callback");
                },
                null,
                cName
              );
              break;
            default:
              NotificationManager.info("Info message");
              break;
          }
        };
    };
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
        const addError = this.props.addError;

        return(
            <Fragment>
            <Row>
              <Colxx xxs="12">
                <Breadcrumb heading="menu.new-partner" match={this.props.match} />
                <Separator className="mb-5" />
              </Colxx>
            </Row>
            <Row className="mb-4">
                <Colxx xxs="12">
                    <Card>
                        <CardBody>
                            <h6 className="mb-4">Declaración jurada de Salud</h6>
                            {addError != null ?
                                <UncontrolledAlert color="danger" fade={false}>
                                    <h5>{addError}</h5>
                                </UncontrolledAlert>
                            : null}
                            <Form className="av-tooltip tooltip-label-right">
                                <FormGroup className="form-group has-float-label">
                                    <Label>
                                    <IntlMessages id="forms.partner-type" />
                                    </Label>
                                    <FormikReactSelect
                                    name="partnerType"
                                    id="partnerType"
                                    value={values.partnerType}
                                    options={partnerForm.data.partnerTypeOptions}
                                    onChange={setFieldValue}
                                    onBlur={setFieldTouched}
                                    />
                                    {errors.partnerType && touched.partnerType ? (
                                    <div className="invalid-feedback d-block">
                                        {errors.partnerType}
                                    </div>
                                    ) : null}
                                </FormGroup>
                                <FormGroup className="form-group has-float-label">
                                    <Label>
                                    <IntlMessages id="forms.doc-type" />
                                    </Label>
                                    <FormikReactSelect
                                    name="docType"
                                    id="docType"
                                    value={values.docType}
                                    options={partnerForm.data.docTypeOptions}
                                    onChange={setFieldValue}
                                    onBlur={setFieldTouched}
                                    />
                                    {errors.docType && touched.docType ? (
                                    <div className="invalid-feedback d-block">
                                        {errors.docType}
                                    </div>
                                    ) : null}
                                </FormGroup>
                                <FormGroup className="form-group has-float-label">
                                    <Label>
                                    <IntlMessages id="forms.doc-number" />
                                    </Label>
                                    <Field
                                    className="form-control"
                                    name="doc_number"
                                    id="doc_number"
                                    value={values.doc_number}
                                    onChange={setFieldValue}
                                    onBlur={setFieldTouched}
                                    />
                                    {errors.doc_number && touched.doc_number ? (
                                    <div className="invalid-feedback d-block">
                                        {errors.doc_number}
                                    </div>
                                    ) : null}
                                </FormGroup>
                                <FormGroup className="form-group has-float-label">
                                    <Label className="d-block">
                                    <IntlMessages id="forms.dob" />
                                    </Label>
                                    <FormikDatePicker
                                    name="dob"
                                    value={values.dob}
                                    onChange={setFieldValue}
                                    onBlur={setFieldTouched}
                                    />
                                    {errors.dob && touched.dob ? (
                                    <div className="invalid-feedback d-block">
                                        {errors.dob}
                                    </div>
                                    ) : null}
                                </FormGroup>
                                <FormGroup className="form-group has-float-label">
                                    <Label>
                                    <IntlMessages id="forms.first-name" />
                                    </Label>
                                    <Field
                                    className="form-control"
                                    name="first_name"
                                    id="first_name"
                                    value={values.first_name}
                                    onChange={setFieldValue}
                                    onBlur={setFieldTouched}
                                    />
                                    {errors.first_name && touched.first_name ? (
                                    <div className="invalid-feedback d-block">
                                        {errors.first_name}
                                    </div>
                                    ) : null}
                                </FormGroup>
                                <br></br>
                                {!isValid ?
                                    <UncontrolledAlert color="danger" fade={false}>
                                        <h5>Todos los campos marcados con (*) son requeridos.</h5>
                                    </UncontrolledAlert>
                                : null}
                                <Button type="submit" disabled={isSubmitting || !isValid}>Guardar</Button>
                            </Form>
                        </CardBody>
                    </Card>
                </Colxx>
            </Row>
        </Fragment>
        );
    }
}
export default NewEditComponent;
