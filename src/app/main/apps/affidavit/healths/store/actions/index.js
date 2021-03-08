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
    q1: 'SI',
    q2: 'SI',
    q3: 'SI',
    q4: 'SI',
    q5: 'SI',
    q6: 'NO',
    q7: 'NO',
    q8: 'NO',
    q9: 'NO',
    q10: 'NO',
    q11: 'NO',
    q12: 'NO',
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
      dispatch(showMessage({
        message: 'Registro creado'
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