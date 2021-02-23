import {
    HEALTH_ADD,
    HEALTH_ADD_SUCCESS,
    HEALTH_ADD_FAILURE,
    HEALTH_GET_LIST,
    HEALTH_GET_LIST_SUCCESS,
    HEALTH_GET_LIST_ERROR
} from "../actions";

export const addHealthAction = (health) => ({
    type: HEALTH_ADD,
    payload: health,
});

export const addHealthSuccessAction = (health) => ({
    type: HEALTH_ADD_SUCCESS,
    payload: health,
});

export const addHealthFailureAction = (error) => ({
    type: HEALTH_ADD_FAILURE,
    payload: error,
});

export const getListHealthAction = (data) => ({
    type: HEALTH_GET_LIST,
    payload: data
})

export const getListHealthSuccessAction = (data) => ({
    type: HEALTH_GET_LIST_SUCCESS,
    payload: data
})

export const getListHealthErrorAction = error => ({
    type: HEALTH_GET_LIST_ERROR,
    payload: error
})