import * as Actions from '../actions';

const usersReducer = function (state = Actions.initialStateList, action) {
  switch (action.type) {
    case Actions.GET_USERS: {
      return {
        ...state,
        data: action.payload
      };
    }
    case Actions.DELETE_USER: {
      const newData = state.data.filter((item) => item._id !== action.payload);
      return {
        ...state,
        data: newData,
      };
    }
    case Actions.SET_USERS_SEARCH_TEXT: {
      return {
        ...state,
        searchText: action.searchText
      };
    }
    case Actions.TOGGLE_IN_SELECTED_USERS: {

      const _id = action._id;

      let selectedIds = [...state.selectedIds];

      if (selectedIds.find(id => id === _id) !== undefined) {
        selectedIds = selectedIds.filter(id => id !== _id);
      } else {
        selectedIds = [...selectedIds, _id];
      }

      return {
        ...state,
        selectedIds: selectedIds
      };
    }
    case Actions.SELECT_ALL_USERS: {
      const arr = Object.keys(state.data).map(k => state.data[k]);

      const selectedIds = arr.map(record => record._id);

      return {
        ...state,
        selectedIds: selectedIds
      };
    }
    case Actions.DESELECT_ALL_USERS: {
      return {
        ...state,
        selectedIds: []
      };
    }
    case Actions.OPEN_NEW_USER_DIALOG: {
      return {
        ...state,
        contactDialog: {
          type: 'new',
          props: {
            open: true
          },
          data: null
        }
      };
    }
    case Actions.CLOSE_NEW_USER_DIALOG: {
      return {
        ...state,
        contactDialog: {
          type: 'new',
          props: {
            open: false
          },
          data: null
        }
      };
    }
    case Actions.OPEN_EDIT_USER_DIALOG: {
      return {
        ...state,
        contactDialog: {
          type: 'edit',
          props: {
            open: true
          },
          data: action.data
        }
      };
    }
    case Actions.CLOSE_EDIT_USER_DIALOG: {
      return {
        ...state,
        contactDialog: {
          type: 'edit',
          props: {
            open: false
          },
          data: null
        }
      };
    }
    default: {
      return state;
    }
  }
};

export default usersReducer;