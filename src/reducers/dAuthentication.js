import { ACTION_TYPES } from "../actions/dAuthenticate";
const initialState = {
    user: { name: "name", code: "code" },
}


export const dAuthenticationReducers = (state = initialState, action) => {

    switch (action.type) {
        case ACTION_TYPES.LOGOUT:
            return {
                ...state,
                user: {},
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