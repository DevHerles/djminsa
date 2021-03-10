import {
  showMessage
} from 'app/store/actions/fuse';
import service from 'app/services/api.service';

export const GET_USER = 'GET USER';
export const GET_USERS = 'GET USERS';
export const SAVE_USER = 'SAVE USER';
export const DELETE_USER = 'DELETE USER';
export const TOGGLE_IN_SELECTED_USERS = '[USERS APP] TOGGLE IN SELECTED USERS';
export const SELECT_ALL_USERS = '[USERS APP] SELECT ALL USERS';
export const DESELECT_ALL_USERS = '[USERS APP] DESELECT ALL USERS';
export const OPEN_NEW_USER_DIALOG = '[USERS APP] OPEN NEW USER DIALOG';
export const CLOSE_NEW_USER_DIALOG = '[USERS APP] CLOSE NEW USER DIALOG';
export const OPEN_EDIT_USER_DIALOG = '[USERS APP] OPEN EDIT USER DIALOG';
export const CLOSE_EDIT_USER_DIALOG = '[USERS APP] CLOSE EDIT USER DIALOG';
export const SET_USERS_SEARCH_TEXT = 'SET USERS SEARCH TEXT';

export const initialStateForm = {
  data: {
    username: '',
    email: '',
    password: '',
    roles: [],
    active: true,
  },
};

export const initialStateList = {
  data: [],
  searchText: '',
  selectedIds: [],
  routeParams: {},
  contactDialog: {
    type: 'new',
    props: {
      open: false
    },
    data: null
  }
};

export function getAll(path) {
  const request = service.getAll(path);
  return (dispatch) =>
    request.then((response) =>
      dispatch({
        type: GET_USERS,
        payload: response.data
      })
    );
}

export function getById(path, id) {
  const request = service.getById(path, id);
  return (dispatch) =>
    request.then((response) =>
      dispatch({
        type: GET_USER,
        payload: response.data
      })
    );
}

export function deleteById(path, id) {
  const request = service.deleteById(path, id);
  return (dispatch) =>
    request.then((response) => {
      dispatch(showMessage({
        message: 'Partner eliminado'
      }));
      return dispatch({
        type: DELETE_USER,
        payload: response.data
      })
    });
}

export function create(path, data) {
  const request = service.create('auth/signup', data);
  return (dispatch) =>
    request.then((response) => {
      dispatch(showMessage({
        message: 'Usuario creado'
      }));
      return dispatch({
        type: SAVE_USER,
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
        type: SAVE_USER,
        payload: response.data
      })
    });
}

export function newRecord() {
  return {
    type: GET_USER,
    payload: initialStateForm
  }
}

export function setSearchText(event) {
  return {
    type: SET_USERS_SEARCH_TEXT,
    searchText: event.target.value
  }
}

export function toggleInSelected(_id) {
  return {
    type: TOGGLE_IN_SELECTED_USERS,
    _id
  }
}

export function selectAll() {
  return {
    type: SELECT_ALL_USERS
  }
}

export function deSelectAll() {
  return {
    type: DESELECT_ALL_USERS
  }
}

export function openNewDialog() {
  return {
    type: OPEN_NEW_USER_DIALOG
  }
}

export function closeNewDialog() {
  return {
    type: CLOSE_NEW_USER_DIALOG
  }
}

export function openEditDialog(data) {
  return {
    type: OPEN_EDIT_USER_DIALOG,
    data
  }
}

export function closeEditDialog() {
  return {
    type: CLOSE_EDIT_USER_DIALOG
  }
}