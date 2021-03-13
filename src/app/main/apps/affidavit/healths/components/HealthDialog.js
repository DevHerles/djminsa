import React, { useEffect, useCallback, Fragment, useState } from 'react';
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogContentText, Icon, IconButton, Typography, Toolbar, AppBar, Avatar } from '@material-ui/core';
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
  const affidavitResult = useSelector(({ affidavitHealthApp }) => affidavitHealthApp.records.affidavitResult);
  const [disclaimer, setDisclaimer] = useState(true);
  const [dialogMaxWidth, setDialogMaxWidth] = useState('md');
  const [dialogTitle, setDialogTitle] = useState('Editar');
  const [hasResponse, setHasResponse] = useState(false);

  function closeComposeDialog() {
    recordDialog.type === 'edit' ? dispatch(Actions.closeEditDialog()) : dispatch(Actions.closeNewDialog());
    setDialogMaxWidth("md");
    setDisclaimer(true);
    dispatch(Actions.resetPreviousResponse());
  }

  function canBeSubmitted() {
    return (
      true
    );
  }

  function handleSubmit(event) {
    event.preventDefault();
    setDialogMaxWidth("lg");
    setDisclaimer(false);
  }

  function handleRemove() {
    console.log('handleRemove()');
    closeComposeDialog();
  }

  useEffect(() => {
    recordDialog.type === 'edit' ? setDialogTitle('Editar declaración jurada de salud') : setDialogTitle('Nueva declaración jurada de salud')
  }, [recordDialog.type]);

  useEffect(() => {
    if(affidavitResult !== null) {
      setHasResponse(true);
    } else {
      setHasResponse(false);
    }
  }, [affidavitResult])

  const questions = [
    { id: "q1", label: "1. Hipertensión arterial no controlada" },
    { id: "q2", label: "2. Enfermedades cardiovasculares graves" },
    { id: "q3", label: "3. Diabetes Mellitus" },
    {
      id: "q4",
      label: "4. Obesidad con IMC de 40 a mas",
      help:
        "El índice de masa corporal (IMC) se determina usando la formula peso(kg) / estatura(m)^2 Ejemplo: Peso 68 kg, Estatura = 1.66 m, Cálculo IMC = 68 / (1.65)(1.65) = 24.98",
    },
    { id: "q5", label: "5. Cáncer" },
    { id: "q6", label: "6. Asma moderada o grave" },
  ];

  const questions1 = [
    { id: "q7", label: "7. Enfermedad pulmonar crónica" },
    {
      id: "q8",
      label: "8. Insuficiencia renal crónica en tratamiento con hemodiálisis",
    },
    { id: "q9", label: "9. Enfermedad o tratamiento inmunosupresor" },
    { id: "q10", label: "10. Edad mayor de 65 años" },
    { id: "q11", label: "11. Gestación" },
    { id: "q12", label: "12. Otros" },
  ];

  return (
    <Dialog
      classes={{
        paper: "m-24"
      }}
      {...recordDialog.props}
      onClose={closeComposeDialog}
      fullWidth
      maxWidth={dialogMaxWidth}
      {...props}
    >
      <AppBar position="static" elevation={1}>
        <Toolbar className="flex w-full">
          <Typography variant="subtitle1" color="inherit">
            {
              dialogTitle
            }
          </Typography>
        </Toolbar>
      </AppBar>

      <DialogContent classes={{ root: "p-24" }}>
        {
          disclaimer && recordDialog.type === 'new' ?
          <div>
            <DialogContentText id="alert-dialog-description">
            <Typography variant="h5" className="primary">
                Términos y condiciones:
              </Typography>
              <br></br>
              <Typography variant="h6" className="secondary">
                a) Todos los datos expresados en esta ficha constituyen declaración jurada
                de mi parte. He sido informado que de omitir o falsear información puedo perjudicar
                la salud de mis compañeros, y la mía propia lo cual, de constituir una falta
                grave a la salud pública, asumo sus consecuencias.
              </Typography>
              <br></br>
              <Typography variant="h6" >
                La presente Declaración Jurada. se realiza al amparo de principio de presunción de
                veracidad establecida en el artículo IV numeral 1 punto 1.7 del Decreto Supremo Nª
                004-JUS-2019 que aprueba la Ley del Procedimiento Administrativo General Nª 27444. (dentro de la ficha)
              </Typography>
              <br></br>
              <Typography variant="h6" >
                b) Los usuarios que presenten síntomas relacionados a COVID-19 y/o hayan estado en contacto con algún
                caso confirmado de COVID-19, no deben asistir a las instalaciones del Ministerio, informado del
                evento a la Unidad Orgánica u Oficina a cargo, y al Servicio médico, anexo 2032 y/o al correo
                cmendoza@minsa.gob.pe / gmaita@minsa.gob.pe (dentro de la ficha).
              </Typography>
            </DialogContentText>
          </div> :
          hasResponse ?
          affidavitResult ? 
          <DialogContentText>
            Fit
          </DialogContentText> : <DialogContentText>Not fit</DialogContentText> :
          <Formik
            initialValues={recordDialog.type === 'new' ? Actions.initialStateForm.data : recordDialog.data}
            onSubmit={(values, {setSubmitting}) => {
              setSubmitting(true);
              if (recordDialog.type === 'new') {
                dispatch(Actions.create(API_PATH, values, props.match.params.filter));
              }
              else {
                dispatch(Actions.updateById(API_PATH, values._id, values, props.match.params.filter));
                closeComposeDialog();
              }
              //closeComposeDialog();
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
              setDialogMaxWidth('lg');
              return (
                <form onSubmit={handleSubmit}>
                  <div className="md:flex">
                    <div className="flex flex-col flex-1 md:pr-32">
                      {questions.map((question) => {
                        return (
                          <Fragment>
                            <SimpleItem
                              required
                              key={`_index_${question.id}`}
                              field={question.id}
                              title={question.label}
                              help={question?.help}
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
                              required
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
                  </div>
                  <br></br>
                  <div className="md:flex">
                    {
                      recordDialog.type === 'new' ? <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      disabled={!isValid ? true : null}
                    >
                      Registrar declaración jurada de salud
                    </Button> : <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      disabled={!isValid ? true : null}
                    >
                      Actualizar declaración jurada de salud
                    </Button>
                    }
                  </div>
                </form>
              );
            }}
          </Formik>
        }
        {disclaimer && recordDialog.type === 'new' ?
          <DialogActions className="justify-between pl-16">
            <Button
              variant="contained"
              color="primary"
              type="submit"
              onClick={handleSubmit}
              disabled={!canBeSubmitted()}
            >
              SÍ estoy de acuerdo, quiero continuar
            </Button>
            <Button
              type="submit"
              onClick={handleRemove}
            >
              NO estoy de acuerdo
            </Button>
          </DialogActions> : null
        }
        {affidavitResult !== null ?
          affidavitResult ?
          <DialogActions className="justify-between pl-16">
            <Button
              variant="contained"
              color="primary"
              type="submit"
              onClick={handleSubmit}
              disabled={!canBeSubmitted()}
            >
              Querio registrar mi declaración jurada de sintomatología
            </Button>
            <Button
              onClick={handleRemove}
            >
              TerminarXX
            </Button>
          </DialogActions> :
          <DialogActions className="justify-between pl-16">
            <Button
              variant="contained"
              color="primary"
              onClick={handleRemove}
            >
              Terminar
            </Button>
          </DialogActions> : null
        }
      </DialogContent>

    </Dialog>
  );
}

export default HealthDialog;
