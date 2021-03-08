import * as Actions from '../actions';

const initialState = {
    data: {},
};

const reducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_PROFILE:
        {
            return {
                ...state,
                data: action.payload
            };
        }
        case Actions.SAVE_PROFILE:
        {
            return {
                ...state,
                data: action.payload
            };
        }
        default:
        {
            return state;
        }
    }
};

export default reducer;
