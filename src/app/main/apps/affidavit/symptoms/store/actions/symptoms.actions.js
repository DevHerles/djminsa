import {
  showMessage
} from 'app/store/actions/fuse';
import service from 'app/services/api.service';

import * as Yup from 'yup';

export const GET_SYMPTOM = '[SYMPTOMS APP] GET SYMPTOM';
export const GET_SYMPTOMS = '[SYMPTOMS APP] GET SYMPTOMS';
export const SAVE_SYMPTOM = '[SYMPTOMS APP] SAVE SYMPTOM';
export const SUCCESS_SAVE_SYMPTOM = '[SYMPTOMS APP] SUCCESS SAVE SYMPTOM';
export const SUCCESS_UPDATE_SYMPTOM = '[SYMPTOMS APP] SUCCESS UPDATE SYMPTOM';
export const DELETE_SYMPTOM = '[SYMPTOMS APP] DELETE SYMPTOM';
export const DELETE_SYMPTOMS = '[SYMPTOMS APP] DELETE SYMPTOMS';
export const TOGGLE_IN_SELECTED_SYMPTOMS = '[SYMPTOMS APP] TOGGLE IN SELECTED SYMPTOMS';
export const TOGGLE_IN_FIT_SYMPTOMS  = '[SYMPTOMS APP] TOGGLE IN FIT SYMPTOMS';
export const SELECT_ALL_SYMPTOMS = '[SYMPTOMS APP] SELECT ALL SYMPTOMS';
export const DESELECT_ALL_SYMPTOMS = '[SYMPTOMS APP] DESELECT ALL SYMPTOMS';
export const OPEN_NEW_SYMPTOM_DIALOG = '[SYMPTOMS APP] OPEN NEW SYMPTOM DIALOG';
export const CLOSE_NEW_SYMPTOM_DIALOG = '[SYMPTOMS APP] CLOSE NEW SYMPTOM DIALOG';
export const OPEN_EDIT_SYMPTOM_DIALOG = '[SYMPTOMS APP] OPEN EDIT SYMPTOM DIALOG';
export const CLOSE_EDIT_SYMPTOM_DIALOG = '[SYMPTOMS APP] CLOSE EDIT SYMPTOM DIALOG';
export const SET_SYMPTOMS_SEARCH_TEXT = 'SET SYMPTOMS SEARCH TEXT';
export const RESET_PREVIOUS_SYMPTOM_RESPONSE = '[SYMPTOMS APP] RESET PREVIOUS SYMPTOM RESPONSE';
export const ALL = 'all';
export const FIT = 'fit';
export const NOT_FIT = 'notfit';

export const validationSchema=Yup.object().shape({
  q1: Yup.string()
    .required('Su respuesta es requerido'),
  q2: Yup.string()
    .required('Su respuesta es requerido'),
  q3: Yup.string()
    .required('Su respuesta es requerido'),
  q4: Yup.string()
    .required('Su respuesta es requerido'),
  q5: Yup.string()
    .required('Su respuesta es requerido'),
  q6: Yup.string()
    .required('Su respuesta es requerido'),
  q6_detail: Yup.string().when("q6", {
    is: "SI",
    then: Yup.string()
      .required("Por favor especifique otros")
      .min(10, "Mínimo 10 caracteres.")
      .max(254, "Máximo 254 caracteres."),
  }),
});

export const initialStateForm = {
  data: {
    _id: '',
    partner_id: '6042a254ab94b74b82f1fb7c',
    q1: '',
    q2: '',
    q3: '',
    q4: '',
    q5: '',
    q6: '',
    q6_detail: '',
    q7: true,
  },
};

export const initialStateList = {
  data: [],
  originalData: [],
  searchText: '',
  selectedIds: [],
  filteredData: [],
  routeParams: {},
  recordDialog: {
    type: 'new',
    props: {
      open: false
    },
    data: null
  },
  affidavitResult: null,
};

export function resetPreviousResponse() {
  return (dispatch) => {
    dispatch({
      type: RESET_PREVIOUS_SYMPTOM_RESPONSE,
      payload: null,
    })
  }
}

export function getAll(path) {
  const request = service.getAll(path);
  return (dispatch) =>
    request.then((response) =>
      dispatch({
        type: GET_SYMPTOMS,
        payload: response.data
      })
    );
}

export function getById(path, id) {
  const request = service.getById(path, id);
  return (dispatch) =>
    request.then((response) =>
      dispatch({
        type: GET_SYMPTOM,
        payload: response.data
      })
    );
}

export function deleteById(path, id) {
  const request = service.deleteById(path, id);
  return (dispatch) =>
    request.then((response) => {
      dispatch(showMessage({
        message: 'Registro eliminado'
      }));
      return dispatch({
        type: DELETE_SYMPTOM,
        payload: response.data
      })
    });
}

export function create(path, data, type) {
  const request = service.create(path, data);
  return (dispatch) =>
    request.then((response) => {
      const { fit, q12 } = response.data;
      const messageFit = 'Datos guardados con éxito. A continuación deberá registrar su declaración jurada de sintomatología.';
      const messageNotFit = 'Estimado(a) Ud. presenta factor de riesgo relacionado a COVID-19, por lo que en resguardo de su salud debe coordinar con su Unidad Orgánica u Oficina o jefe a cargo a fin de que realice trabajo remoto. .';
      const twelveDetail = 'Estimado(a) al haber declarado una condición de salud, el equipo de Seguridad y Salud en el Trabajo, evaluará su caso dentro de las 24 horas. Se le comunicará mediante correo electrónico en caso se acepta la solicitud de trabajo presencial.'

      dispatch(showMessage({
        message: fit ? messageFit : q12 === 'SI' ? twelveDetail : messageNotFit,
        autoHideDuration: 24000,//ms
        anchorOrigin: {
          vertical  : 'top',//top bottom
          horizontal: 'center'//left center right
        },
        variant: fit ? 'success' : q12 === 'SI' ? 'warning': 'error'//success error info warning null
      }));
      return dispatch({
        type: SUCCESS_SAVE_SYMPTOM,
        payload: response.data,
        filterType: type
      })
    });
}

export function updateById(path, id, data, type) {
  const request = service.updateById(path, id, data);
  return (dispatch) =>
    request.then((response) => {
      dispatch(showMessage({
        message: 'Datos actualizados'
      }));
      return dispatch({
        type: SUCCESS_UPDATE_SYMPTOM,
        payload: response.data,
        filterType: type
      })
    });
}

export function newRecord() {
  return {
    type: GET_SYMPTOM,
    payload: initialStateForm.data,
  }
}

export function setSearchText(event) {
  return {
    type: SET_SYMPTOMS_SEARCH_TEXT,
    searchText: event.target.value
  }
}

export function toggleInSelected(_id) {
  return {
    type: TOGGLE_IN_SELECTED_SYMPTOMS,
    _id
  }
}

export function toggleInFit(type) {
  return {
    type: TOGGLE_IN_FIT_SYMPTOMS,
    filterType: type
  }
}

export function selectAll() {
  return {
    type: SELECT_ALL_SYMPTOMS
  }
}

export function deSelectAll() {
  return {
    type: DESELECT_ALL_SYMPTOMS
  }
}

export function openNewDialog() {
  return {
    type: OPEN_NEW_SYMPTOM_DIALOG
  }
}

export function closeNewDialog() {
  return {
    type: CLOSE_NEW_SYMPTOM_DIALOG
  }
}

export function openEditDialog(data) {
  return {
    type: OPEN_EDIT_SYMPTOM_DIALOG,
    data
  }
}

export function closeEditDialog() {
  return {
    type: CLOSE_EDIT_SYMPTOM_DIALOG
  }
}
