import { ACTION_TYPES } from "../actions/dAuthenticate";
const initialState = {
    user: null,
}


export const dAuthenticationReducers = (state = initialState, action) => {

    switch (action.type) {
        case ACTION_TYPES.LOGOUT:
            return {
                ...state,
                user: null,
            }

        case ACTION_TYPES.LOGIN:
            return {
                ...state,
                user: action.payload,
            }
                        
        default:
            return state
    }
}