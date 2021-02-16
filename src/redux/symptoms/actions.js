import {
    ADD_SYMPTOMS,
    ADD_SYMPTOMS_SUCCESS,
    ADD_SYMPTOMS_FAILURE,
} from "../actions";

export const addSymptoms = (symptoms) => ({
    type: ADD_SYMPTOMS,
    payload: symptoms,
});

export const addSymptomsSuccess = (symptoms) => ({
    type: ADD_SYMPTOMS_SUCCESS,
    payload: symptoms,
});

export const addSymptomsFailure = (error) => ({
    type: ADD_SYMPTOMS_FAILURE,
    payload: error,
});