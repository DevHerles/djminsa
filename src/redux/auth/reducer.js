import {
    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILURE,
    REGISTER_USER,
    REGISTER_USER_SUCCESS,
    LOGOUT_USER,
} from '../actions';

import localStorage from '../../services/localStorageService';

const INIT_STATE = {
    user: localStorage.getItem('jwt_token'),
    error: '',
    loading: false
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case LOGIN_USER:
            return {
                ...state, loading: true, error: "",
            };
        case LOGIN_USER_SUCCESS:
            return {
                ...state, loading: false, user: action.payload
            };
        case LOGIN_USER_FAILURE:
            return {
                ...state, loading: false, error: action.payload, user: {}
            };
        case REGISTER_USER:
            return {
                ...state, loading: true
            };
        case REGISTER_USER_SUCCESS:
            return {
                ...state, loading: false, user: action.payload.uid
            };
        case LOGOUT_USER:
            return {
                ...state, user: null
            };
        default:
            return {
                ...state
            };
    }
}