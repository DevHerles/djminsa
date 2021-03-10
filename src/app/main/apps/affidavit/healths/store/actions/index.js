import {
  showMessage
} from 'app/store/actions/fuse';
import service from 'app/services/api.service';

export const GET_HEALTH = 'GET HEALTH';
export const GET_HEALTHS = 'GET HEALTHS';
export const SAVE_HEALTH = 'SAVE HEALTH';
export const DELETE_HEALTH = 'DELETE HEALTH';
export const SET_HEALTHS_SEARCH_TEXT = 'SET HEALTHS SEARCH TEXT';

export const initialStateForm = {
  data: {
    user_id: '6042a254ab94b74b82f1fb7d',
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
  searchText: '',
};

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

export function create(path, data) {
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
        type: SAVE_HEALTH,
        payload: response.data
      })
    });
}

export function updateById(path, id, data) {
  const request = service.updateById(path, id, data);
  return (dispatch) =>
    request.then((response) => {
      dispatch(showMessage({
        message: 'Datos actualizados'
      }));
      return dispatch({
        type: SAVE_HEALTH,
        payload: response.data
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