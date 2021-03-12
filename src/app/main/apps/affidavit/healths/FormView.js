import React, { useEffect, useState, Fragment } from 'react';
import { Button, Tab, Tabs, Icon, Typography } from '@material-ui/core';
import { DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import { orange } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/styles';
import {FormControl} from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import { FuseAnimate, FusePageCarded, FuseUtils } from '@fuse';
import { SimpleItem } from '@asf';
import { useForm } from '@fuse/hooks';
import { Link } from 'react-router-dom';
import _ from '@lodash';
import { useDispatch, useSelector } from 'react-redux';
import withReducer from 'app/store/withReducer';
import * as Actions from './store/actions';
import * as _DialogActions from 'app/store/actions';
import reducer from './store/reducers';
import {
  showMessage
} from 'app/store/actions/fuse';

const useStyles = makeStyles(theme => ({
  productImageFeaturedStar: {
    position: 'absolute',
    top: 0,
    right: 0,
    color: orange[400],
    opacity: 0
  },
  productImageUpload: {
    transitionProperty: 'box-shadow',
    transitionDuration: theme.transitions.duration.short,
    transitionTimingFunction: theme.transitions.easing.easeInOut,
  },
  productImageItem: {
    transitionProperty: 'box-shadow',
    transitionDuration: theme.transitions.duration.short,
    transitionTimingFunction: theme.transitions.easing.easeInOut,
    '&:hover': {
      '& $productImageFeaturedStar': {
        opacity: .8
      }
    },
    '&.featured': {
      pointerEvents: 'none',
      boxShadow: theme.shadows[3],
      '& $productImageFeaturedStar': {
        opacity: 1
      },
      '&:hover $productImageFeaturedStar': {
        opacity: 1
      }
    }
  }
}));

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
];

const questions1 = [
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

const API_PATH = 'healths';

function Health(props) {
  const dispatch = useDispatch();
  const record = useSelector(({ affidavitHealthApp }) => affidavitHealthApp.record);

  const [tabValue, setTabValue] = useState(0);
  const { form, handleChange, setForm } = useForm(null);

  useEffect(() => {
    function updateFormState() {
      const params = props.match.params;
      const { id } = params;

      if (id === 'new') {
        dispatch(Actions.newRecord());
      }
      else {
        console.log(props.match.params);
        dispatch(Actions.getById(API_PATH, id));
      }
    }

    updateFormState();
  }, [dispatch, props.match.params]);

  useEffect(() => {
    if (
      (record.data && !form) ||
      (record.data && form && record.data._id !== form._id)
    ) {
      setForm(record.data);
    }
  }, [form, record.data, setForm]);

  function handleChangeTab(tabValue) {
    setTabValue(tabValue);
  }

  function canBeSubmitted() {
    return true;
    return (
      form.name.length > 0 &&
      !_.isEqual(record.data, form)
    );
  }

  return (
    <FusePageCarded
      classes={{
        toolbar: "p-0",
        header: "min-h-72 h-72 sm:h-136 sm:min-h-136"
      }}
      header={
        form && (
          <div className="flex flex-1 w-full items-center justify-between">

            <div className="flex flex-col items-start max-w-full">

              <FuseAnimate animation="transition.slideRightIn" delay={300}>
                <Typography className="normal-case flex items-center sm:mb-12" component={Link} role="button" to="/apps/affidavit/healths" color="inherit">
                  <Icon className="mr-4 text-20">arrow_back</Icon>
                  Mis declaraciones juradas de salud
                </Typography>
              </FuseAnimate>
            </div>
            <FuseAnimate animation="transition.slideRightIn" delay={300}>
              <Button
                className="whitespace-no-wrap"
                variant="contained"
                disabled={!canBeSubmitted()}
                onClick={() => dispatch(_DialogActions.openDialog({
                  children: (
                    <React.Fragment>
                      <DialogTitle id="alert-dialog-title">!ATENCIÓN¡</DialogTitle>
                      <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                          <h3 className="secondary">
                            a) Todos los datos expresados en esta ficha constituyen declaración jurada
                            de mi parte. He sido informado que de omitir o falsear información puedo perjudicar
                            la salud de mis compañeros, y la mía propia lo cual, de constituir una falta
                            grave a la salud pública, asumo sus consecuencias.
                          </h3>
                          <h3>
                            La presente Declaración Jurada. se realiza al amparao de principio de presunción de
                            veracidad establecida en el artículo IV numeral 1 punto 1.7 del Decreto Supremo Nª
                            004-JUS-2019 que aprueba la Ley del Procedimiento Administrativo General Nª 27444. (dentro de la ficha)
                          </h3>
                          <h3>
                            b) Los usuarios que presenten síntomas relacionados a COVID-19 y/o hayan estado en contacto con algún
                            caso confirmado de COVID-19, no deben asistir a las instalaciones del Ministerio, informado del
                            evento a la Unidad Orgánica u Oficina a cargo, y al Servicio médico, anexo 2032 y/o al correo
                            cmendoza@minsa.gob.pe / gmaita@minsa.gob.pe (dentro de la ficha).
                          </h3>
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={() => {
                          console.log('API_PATH, form:', API_PATH, form);
                          dispatch(Actions.create(API_PATH, form));
                          dispatch(_DialogActions.closeDialog());
                          props.history.push('/apps/affidavit/healths');
                        }} color="error">
                          De acuerdo
                        </Button>
                        <Button onClick={() => {
                          dispatch(showMessage({
                            message: 'Ud. no está de acuerdo con las condiciones. El proceso de registro de la declaración jurada de salud ha sido cancelado.',
                            autoHideDuration: 24000,//ms
                            anchorOrigin: {
                              vertical  : 'top',//top bottom
                              horizontal: 'center'//left center right
                            },
                            variant: 'warning' //success error info warning null
                          }));
                          props.history.push('/apps/affidavit/healths');
                          dispatch(_DialogActions.closeDialog())
                        }} color="primary" autoFocus>
                          No estoy de acuerdo
                        </Button>
                      </DialogActions>
                    </React.Fragment>
                  )
                }))}
              >
                Guardar
                            </Button>
            </FuseAnimate>
          </div>
        )
      }
      contentToolbar={
        <Tabs
          value={tabValue}
          onChange={handleChangeTab}
          indicatorColor="secondary"
          textColor="secondary"
          variant="scrollable"
          scrollButtons="auto"
          classes={{ root: "w-full h-64" }}
        >
          <Tab className="h-64 normal-case" label="Basic Info" />
        </Tabs>
      }
      content={
        form && (
          <div className="p-16 sm:p-24 max-w-2xl">
            {tabValue === 0 &&
              (
                <div>
                  {questions.map((question) => {
                    return (
                      <Fragment>
                        <SimpleItem key={`_index_${question.id}`} title={question.label} onChange={handleChange} value={eval(`form.${question.id}`)} field={question.id} />

                      </Fragment>
                    );
                  })}
                  {questions1.map((question) => {
                    return (
                      <Fragment>
                        <SimpleItem key={`_index_${question.id}`} title={question.label} onChange={handleChange} value={eval(`form.${question.id}`)} field={question.id} />

                      </Fragment>
                    );
                  })}
                </div>
              )}
          </div>
        )
      }
      innerScroll
    />
  )
}

export default withReducer('affidavitHealthApp', reducer)(Health);
