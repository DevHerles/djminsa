import {
  showMessage
} from 'app/store/actions/fuse';
import service from 'app/services/api.service';

export const GET_PARTNER = 'GET PARTNER';
export const GET_PARTNERS = 'GET PARTNERS';
export const SAVE_PARTNER = 'SAVE PARTNER';
export const DELETE_PARTNER = 'DELETE PARTNER';
export const SET_PARTNERS_SEARCH_TEXT = 'SET PARTNERS SEARCH TEXT';

export const initialStateForm = {
  data: {
    type: 'EMPLEADO',
    first_name: '',
    last_name: '',
    name: '',
    doc_type: 'DNI',
    doc_number: '',
    dob: '',
    email: '',
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
        type: GET_PARTNERS,
        payload: response.data
      })
    );
}

export function getById(path, id) {
  const request = service.getById(path, id);
  return (dispatch) =>
    request.then((response) =>
      dispatch({
        type: GET_PARTNER,
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
        type: DELETE_PARTNER,
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
        type: SAVE_PARTNER,
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
        type: SAVE_PARTNER,
        payload: response.data
      })
    });
}

export function newRecord() {
  return {
    type: GET_PARTNER,
    payload: initialStateForm.data,
  }
}

export function setSearchText(event) {
  return {
    type: SET_PARTNERS_SEARCH_TEXT,
    searchText: event.target.value
  }
}