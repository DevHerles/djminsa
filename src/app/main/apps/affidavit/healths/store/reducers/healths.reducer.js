import * as Actions from '../actions';

const reducer = function (state = Actions.initialStateList, action) {
  switch (action.type) {
    case Actions.GET_HEALTHS: {
      return {
        ...state,
        data: action.payload,
        originalData: action.payload,
      };
    }
    case Actions.DELETE_HEALTH: {
      const newData = state.data.filter((item) => item._id !== action.payload);
      return {
        ...state,
        data: newData,
        originalData: newData,
      };
    }
    case Actions.SET_HEALTHS_SEARCH_TEXT: {
      return {
        ...state,
        searchText: action.searchText
      };
    }
    case Actions.TOGGLE_IN_SELECTED_HEALTHS: {

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
    case Actions.TOGGLE_IN_FIT_HEALTHS: {
      const _filterType = action.filterType;

      let filteredData = [];
      if (_filterType === 'all') {
        filteredData = state.originalData;
      } else {
        const _filter = _filterType === 'fit' ? true : false
        if (state.originalData.length > 0) {
          filteredData = state.originalData.filter((item) => item.fit === _filter);
        }
      }

      return {
        ...state,
        data: filteredData,
      };
    }
    case Actions.SELECT_ALL_HEALTHS: {
      const arr = Object.keys(state.data).map(k => state.data[k]);

      const selectedIds = arr.map(record => record.id);

      return {
        ...state,
        selectedIds: selectedIds
      };
    }
    case Actions.DESELECT_ALL_HEALTHS: {
      return {
        ...state,
        selectedIds: []
      };
    }
    case Actions.OPEN_NEW_HEALTH_DIALOG: {
      return {
        ...state,
        recordDialog: {
          type: 'new',
          props: {
            open: true
          },
          data: null
        }
      };
    }
    case Actions.CLOSE_NEW_HEALTH_DIALOG: {
      return {
        ...state,
        recordDialog: {
          type: 'new',
          props: {
            open: false
          },
          data: null
        }
      };
    }
    case Actions.OPEN_EDIT_HEALTH_DIALOG: {
      return {
        ...state,
        recordDialog: {
          type: 'edit',
          props: {
            open: true
          },
          data: action.data
        }
      };
    }
    case Actions.CLOSE_EDIT_HEALTH_DIALOG: {
      return {
        ...state,
        recordDialog: {
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

export default reducer;