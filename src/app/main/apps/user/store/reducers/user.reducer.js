import * as Actions from '../actions';

const userReducer = function (state = Actions.initialStateForm, action) {
    switch ( action.type )
    {
        case Actions.GET_USER:
        {
            return {
                ...state,
                data: action.payload
            };
        }
        case Actions.SAVE_USER:
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

export default userReducer;
