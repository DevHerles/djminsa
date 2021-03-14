import React, { useEffect, Fragment, useState } from 'react';
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogContentText, Typography, Toolbar, AppBar } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { SimpleItem } from '@asf';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {Formik } from 'formik';
import * as Actions from '../store/actions';

const helperTextstyles = {
  helper: {
    color: 'red',
    fontSize: 14,
  }
}
const API_PATH='healths';

function HealthDialog(props) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const dispatch = useDispatch();
  const recordDialog = useSelector(({ affidavitHealthApp }) => affidavitHealthApp.records.recordDialog);
  const affidavitResult = useSelector(({ affidavitHealthApp }) => affidavitHealthApp.records.affidavitResult);
  const [disclaimer, setDisclaimer] = useState(true);
  const [dialogMaxWidth, setDialogMaxWidth] = useState('lg');
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
      {...recordDialog.props}
      onClose={closeComposeDialog}
      fullWidth
      fullScreen={fullScreen}
      maxWidth={dialogMaxWidth}
      aria-labelledby="responsive-dialog-title"
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
            <DialogContentText id="alert-dialog-description" variant="subtitle1"color="primary">
              Términos y condiciones:
            </DialogContentText>
            <DialogContentText id="alert-dialog-description" variant="subtitle2" color="error">
              a) Todos los datos expresados en esta ficha constituyen declaración jurada
              de mi parte. He sido informado que de omitir o falsear información puedo perjudicar
              la salud de mis compañeros, y la mía propia lo cual, de constituir una falta
              grave a la salud pública, asumo sus consecuencias.
            </DialogContentText>
            <DialogContentText id="alert-dialog-description" variant="subtitle2" color="error">
              La presente Declaración Jurada. se realiza al amparo de principio de presunción de
              veracidad establecida en el artículo IV numeral 1 punto 1.7 del Decreto Supremo Nª
              004-JUS-2019 que aprueba la Ley del Procedimiento Administrativo General Nª 27444. (dentro de la ficha)
            </DialogContentText>
            <DialogContentText id="alert-dialog-description" variant="subtitle2" color="error">
              b) Los usuarios que presenten síntomas relacionados a COVID-19 y/o hayan estado en contacto con algún
              caso confirmado de COVID-19, no deben asistir a las instalaciones del Ministerio, informado del
              evento a la Unidad Orgánica u Oficina a cargo, y al Servicio médico, anexo 2032 y/o al correo
              cmendoza@minsa.gob.pe / gmaita@minsa.gob.pe (dentro de la ficha).
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
                isSubmitting,
                handleChange,
                handleBlur,
                handleSubmit,
                isValid,
              } = props;
              return (
                <>
                <form onSubmit={handleSubmit}>
                  <div className="md:flex">
                    <div className="flex flex-col flex-1 md:pr-32">
                      {questions.map((question) => {
                        return (
                          <Fragment
                            key={`_index_${question.id}`}
                          >
                            <SimpleItem
                              required
                              fullScreen={fullScreen}
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
                          <Fragment
                          key={`_index__${question.id}`}
                          >
                            <SimpleItem
                              required
                              fullScreen={fullScreen}
                              key={`_index__${question.id}`}
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
                      { values.q12 ==='SI' ?
                      <TextField
                        label="Detalle otros*"
                        name="q12_detail"
                        className="mt-20"
                        value={values.q12_detail}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        multiline
                        rows={2}
                        helperText={(errors?.q12_detail && touched.q12_detail) && errors?.q12_detail}
                        FormHelperTextProps={{
                          style: helperTextstyles.helper
                        }}
                        margin="normal"
                        variant="outlined"
                      />: null }
                    </div>
                  </div>
                  <br></br>
                  <div className="md:flex">
                    {
                      recordDialog.type === 'new' ?
                      <DialogActions className="justify-between pl-16">
                        <Button
                          variant="contained"
                          color="primary"
                          type="submit"
                          disabled={!isValid || isSubmitting}
                        >
                          Registrar declaración jurada de salud
                        </Button>
                        <Button
                          onClick={handleRemove}
                        >
                          CANCELAR
                        </Button>
                      </DialogActions> : 
                    <DialogActions className="justify-between pl-16">
                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        disabled={!isValid || isSubmitting}
                      >
                        Actualizar declaración jurada de salud
                      </Button>
                      <Button
                        onClick={handleRemove}
                      >
                        CERRAR
                      </Button>
                    </DialogActions>
                    }
                  </div>
                </form>
                </>
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
              Continuar con la declaración jurada de sintomatología
            </Button>
            <Button
              onClick={handleRemove}
            >
              Finalizar
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
