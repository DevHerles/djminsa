import {
    ADD_SYMPTOMS,
    ADD_SYMPTOMS_SUCCESS,
    ADD_SYMPTOMS_FAILURE,
} from "../actions";

export const addSymptomsAction = (symptoms) => ({
    type: ADD_SYMPTOMS,
    payload: symptoms,
});

export const addSymptomsSuccessAction = (symptoms) => ({
    type: ADD_SYMPTOMS_SUCCESS,
    payload: symptoms,
});

export const addSymptomsFailureAction = (error) => ({
    type: ADD_SYMPTOMS_FAILURE,
    payload: error,
});