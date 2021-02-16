import {
    ADD_SYMPTOMS,
    ADD_SYMPTOMS_SUCCESS,
    ADD_SYMPTOMS_FAILURE,
} from "../actions";


const INIT_STATE = {
    symptoms: {
        q1: "",
        q2: "",
        q3: "",
        q4: "",
        q5: "",
        q5_detail: "",
    },
    loading: false,
    error: false,
    errorMessage: "",
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case ADD_SYMPTOMS:
            return {
                ...state, loading: true, error: false, errorMessage: ""
            };
        case ADD_SYMPTOMS_SUCCESS:
            return {
                ...state, loading: false, error: false, errorMessage: "", symptoms: action.payload
            };
        case ADD_SYMPTOMS_FAILURE:
            return {
                ...state, loading: false, error: true, errorMessage: action.payload
            };
        default:
            return {
                ...state
            };
    }
}