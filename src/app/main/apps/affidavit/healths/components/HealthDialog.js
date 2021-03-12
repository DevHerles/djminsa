import React, { useEffect, useCallback, Fragment, useState } from 'react';
import { TextField, Button, Dialog, DialogActions, DialogContent, Icon, IconButton, Typography, Toolbar, AppBar, Avatar } from '@material-ui/core';
import { Tab, Tabs } from '@material-ui/core';
import { useForm } from '@fuse/hooks';
import FuseUtils from '@fuse/FuseUtils';
import * as Actions from '../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { SimpleItem } from '@asf';
import {Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const API_PATH='healths';

function HealthDialog(props) {
  const dispatch = useDispatch();
  const recordDialog = useSelector(({ affidavitHealthApp }) => affidavitHealthApp.records.recordDialog);

  function closeComposeDialog() {
    recordDialog.type === 'edit' ? dispatch(Actions.closeEditDialog()) : dispatch(Actions.closeNewDialog());
  }

  function canBeSubmitted() {
    return (
      true
    );
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log('handleSubmit(event)');
    closeComposeDialog();
  }

  function handleRemove() {
    console.log('handleRemove()');
    closeComposeDialog();
  }

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
  ];

  const questions1 = [
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

  return (
    <Dialog
      classes={{
        paper: "m-24"
      }}
      {...recordDialog.props}
      onClose={closeComposeDialog}
      fullWidth
      maxWidth="lg"
    >

      <AppBar position="static" elevation={1}>
        <Toolbar className="flex w-full">
          <Typography variant="subtitle1" color="inherit">
            {recordDialog.type === 'new' ? 'Nueva declaración jurada de salud' : 'Editar declaración jurada de salud'}
          </Typography>
        </Toolbar>
      </AppBar>

      <DialogContent classes={{ root: "p-24" }}>
        <Formik
          initialValues={recordDialog.type === 'new' ? Actions.initialStateForm.data : recordDialog.data}
          onSubmit={(values, {setSubmitting}) => {
            setSubmitting(true);
            console.log(values);
            if (recordDialog.type === 'new') {
              dispatch(Actions.create(API_PATH, values));
            }
            else {
              dispatch(Actions.updateById(API_PATH, values, values._id));
            }
            closeComposeDialog();
          }}
          validationSchema={Actions.validationSchema}
        >
          {(props) => {
            const {
              values,
              touched,
              errors,
              dirty,
              isSubmitting,
              handleChange,
              handleBlur,
              handleSubmit,
              handleReset,
              isValid,
            } = props;
            return (
              <form onSubmit={handleSubmit}>
                <div className="md:flex">
                  <div className="flex flex-col flex-1 md:pr-32">
                    {questions.map((question) => {
                      return (
                        <Fragment>
                          <SimpleItem
                            key={`_index_${question.id}`}
                            field={question.id}
                            title={question.label}
                            onChange={handleChange}
                            handleBlur={handleBlur}
                            touched={touched}
                            value={eval(`values.${question.id}`)}
                            errors={eval(`errors.${question.id}`)} />
                        </Fragment>
                      );
                    })}
                  </div>
                  <div className="flex flex-col flex-1 md:pr-32">
                    {questions1.map((question) => {
                      return (
                        <Fragment>
                          <SimpleItem
                            key={`_index_${question.id}`}
                            field={question.id}
                            title={question.label}
                            onChange={handleChange}
                            handleBlur={handleBlur}
                            touched={touched}
                            value={eval(`values.${question.id}`)}
                            errors={eval(`errors.${question.id}`)} />
                        </Fragment>
                      );
                    })}
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      disabled={!isValid ? true : null}
                    >
                      Generar declaración jurada de salud
                    </Button>
                  </div>
                </div>
              </form>
            );
          }}
        </Formik>
        {/* <div className="md:flex">
          <div className="flex flex-col flex-1 md:pr-32">
            {questions.map((question) => {
              return (
                <Fragment>
                  <SimpleItem key={`_index_${question.id}`} title={question.label} onChange={handleChange} value={eval(`form.${question.id}`)} field={question.id} />
                </Fragment>
              );
            })}
          </div>
          <div className="flex flex-col flex-1">
            {questions1.map((question) => {
              return (
                <Fragment>
                  <SimpleItem key={`_index_${question.id}`} title={question.label} onChange={handleChange} value={eval(`form.${question.id}`)} field={question.id} />
                </Fragment>
              );
            })}
          </div>
        </div> */}
        {recordDialog.type === 'new' ? (
          <DialogActions className="justify-between pl-16">
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              type="submit"
              disabled={!canBeSubmitted()}
            >
              Add
            </Button>
          </DialogActions>
        ) : (
            <DialogActions className="justify-between pl-16">
              <Button
                variant="contained"
                color="primary"
                type="submit"
                onClick={handleSubmit}
                disabled={!canBeSubmitted()}
              >
                Save
              </Button>
              <IconButton
                onClick={handleRemove}
              >
                <Icon>delete</Icon>
              </IconButton>
            </DialogActions>
          )}

      </DialogContent>

    </Dialog>
  );
}

export default HealthDialog;
