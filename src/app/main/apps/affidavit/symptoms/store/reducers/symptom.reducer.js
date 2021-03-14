import * as Actions from '../actions';

const reducer = function (state = Actions.initialStateForm, action) {
  switch (action.type) {
    case Actions.GET_SYMPTOM: {
      return {
        ...state,
        data: action.payload
      };
    }
    case Actions.SAVE_SYMPTOM: {
      return {
        ...state,
        data: action.payload
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;