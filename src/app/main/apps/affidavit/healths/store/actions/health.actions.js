import {
  showMessage
} from 'app/store/actions/fuse';
import service from 'app/services/api.service';

import * as Yup from 'yup';

export const GET_HEALTH = '[HEALTHS APP] GET HEALTH';
export const GET_HEALTHS = '[HEALTHS APP] GET HEALTHS';
export const SAVE_HEALTH = '[HEALTHS APP] SAVE HEALTH';
export const SUCCESS_SAVE_HEALTH = '[HEALTHS APP] SUCCESS SAVE HEALTH';
export const SUCCESS_UPDATE_HEALTH = '[HEALTHS APP] SUCCESS UPDATE HEALTH';
export const DELETE_HEALTH = '[HEALTHS APP] DELETE HEALTH';
export const DELETE_HEALTHS = '[HEALTHS APP] DELETE HEALTHS';
export const TOGGLE_IN_SELECTED_HEALTHS = '[HEALTHS APP] TOGGLE IN SELECTED HEALTHS';
export const TOGGLE_IN_FIT_HEALTHS  = '[HEALTHS APP] TOGGLE IN FIT HEALTHS';
export const SELECT_ALL_HEALTHS = '[HEALTHS APP] SELECT ALL HEALTHS';
export const DESELECT_ALL_HEALTHS = '[HEALTHS APP] DESELECT ALL HEALTHS';
export const OPEN_NEW_HEALTH_DIALOG = '[HEALTHS APP] OPEN NEW HEALTH DIALOG';
export const CLOSE_NEW_HEALTH_DIALOG = '[HEALTHS APP] CLOSE NEW HEALTH DIALOG';
export const OPEN_EDIT_HEALTH_DIALOG = '[HEALTHS APP] OPEN EDIT HEALTH DIALOG';
export const CLOSE_EDIT_HEALTH_DIALOG = '[HEALTHS APP] CLOSE EDIT HEALTH DIALOG';
export const SET_HEALTHS_SEARCH_TEXT = 'SET HEALTHS SEARCH TEXT';
export const RESET_PREVIOUS_HEALTH_RESPONSE = '[HEALTHS APP] RESET PREVIOUS HEALTH RESPONSE';
export const ALL = 'all';
export const FIT = 'fit';
export const NOT_FIT = 'notfit';

export const validationSchema=Yup.object().shape({
  q1: Yup.string()
    .required('Question 1 is required'),
  q2: Yup.string()
    .required('Required'),
  q3: Yup.string()
    .required('Required'),
  q4: Yup.string()
    .required('Required'),
  q5: Yup.string()
    .required('Required'),
  q6: Yup.string()
    .required('Required'),
  q7: Yup.string()
    .required('Required'),
  q8: Yup.string()
    .required('Required'),
  q9: Yup.string()
    .required('Required'),
  q10: Yup.string()
    .required('Required'),
  q11: Yup.string()
    .required('Required'),
  q12: Yup.string()
    .required('Required'),
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
    q7: '',
    q8: '',
    q9: '',
    q10: '',
    q11: '',
    q12: '',
    q12_detail: '',
    q13: false,
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
      type: RESET_PREVIOUS_HEALTH_RESPONSE,
      payload: null,
    })
  }
}

export function getAll(path) {
  const request = service.getAll(path);
  return (dispatch) =>
    request.then((response) =>
      dispatch({
        type: GET_HEALTHS,
        payload: response.data
      })
    );
}

export function getById(path, id) {
  const request = service.getById(path, id);
  return (dispatch) =>
    request.then((response) =>
      dispatch({
        type: GET_HEALTH,
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
        type: DELETE_HEALTH,
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
        type: SUCCESS_SAVE_HEALTH,
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
        type: SUCCESS_UPDATE_HEALTH,
        payload: response.data,
        filterType: type
      })
    });
}

export function newRecord() {
  return {
    type: GET_HEALTH,
    payload: initialStateForm.data,
  }
}

export function setSearchText(event) {
  return {
    type: SET_HEALTHS_SEARCH_TEXT,
    searchText: event.target.value
  }
}

export function toggleInSelected(_id) {
  return {
    type: TOGGLE_IN_SELECTED_HEALTHS,
    _id
  }
}

export function toggleInFit(type) {
  return {
    type: TOGGLE_IN_FIT_HEALTHS,
    filterType: type
  }
}

export function selectAll() {
  return {
    type: SELECT_ALL_HEALTHS
  }
}

export function deSelectAll() {
  return {
    type: DESELECT_ALL_HEALTHS
  }
}

export function openNewDialog() {
  return {
    type: OPEN_NEW_HEALTH_DIALOG
  }
}

export function closeNewDialog() {
  return {
    type: CLOSE_NEW_HEALTH_DIALOG
  }
}

export function openEditDialog(data) {
  return {
    type: OPEN_EDIT_HEALTH_DIALOG,
    data
  }
}

export function closeEditDialog() {
  return {
    type: CLOSE_EDIT_HEALTH_DIALOG
  }
}
