import {
    ADD_HEALTH,
    ADD_HEALTH_SUCCESS,
    ADD_HEALTH_FAILURE,
} from "../actions";

export const addHealth = (health) => ({
    type: ADD_HEALTH,
    payload: health,
});

export const addHealthSuccess = (health) => ({
    type: ADD_HEALTH_SUCCESS,
    payload: health,
});

export const addHealthFailure = (error) => ({
    type: ADD_HEALTH_FAILURE,
    payload: error,
});