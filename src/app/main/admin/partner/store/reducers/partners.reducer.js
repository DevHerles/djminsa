import * as Actions from '../actions';

const reducer = function (state = Actions.initialStateList, action) {
  switch (action.type) {
    case Actions.GET_PARTNERS: {
      return {
        ...state,
        data: action.payload,
      };
    }
    case Actions.SET_PARTNERS_SEARCH_TEXT: {
      return {
        ...state,
        searchText: action.searchText
      };
    }
    default: {
      return state;
    }
  }
}

export default reducer;