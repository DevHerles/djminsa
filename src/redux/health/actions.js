import {
    ADD_HEALTH,
    ADD_HEALTH_SUCCESS,
    ADD_HEALTH_FAILURE,
} from "../actions";

export const addHealthAction = (health) => ({
    type: ADD_HEALTH,
    payload: health,
});

export const addHealthSuccessAction = (health) => ({
    type: ADD_HEALTH_SUCCESS,
    payload: health,
});

export const addHealthFailureAction = (error) => ({
    type: ADD_HEALTH_FAILURE,
    payload: error,
});