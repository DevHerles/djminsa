import * as Actions from '../actions';

const reducer = function (state = Actions.initialStateList, action) {
  switch (action.type) {
    case Actions.GET_HEALTHS: {
      return {
        ...state,
        data: action.payload
      };
    }
    case Actions.SET_HEALTHS_SEARCH_TEXT: {
      return {
        ...state,
        searchText: action.searchText
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;