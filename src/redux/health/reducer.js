import {
    ADD_HEALTH,
    ADD_HEALTH_SUCCESS,
    ADD_HEALTH_FAILURE,
} from "../actions";

const INIT_STATE = {
    newHealth: {
        q1: "",
        q2: "",
        q3: "",
        q4: "",
        q5: "",
        q6: "",
        q7: "",
        q8: "",
        q9: "",
        q10: "",
        q11: "",
        q12_detail: "",
    },
    healths: [],
    loading: false,
    error: false,
    errorMessage: "",
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case ADD_HEALTH:
            return {
                ...state, loading: true, error: false, errorMessage: ""
            };
        case ADD_HEALTH_SUCCESS:
            return {
                ...state, loading: false, error: false, errorMessage: "", health: action.payload
            };
        case ADD_HEALTH_FAILURE:
            return {
                ...state, loading: false, error: true, errorMessage: action.payload
            };
        default:
            return {
                ...state
            };
    }
}