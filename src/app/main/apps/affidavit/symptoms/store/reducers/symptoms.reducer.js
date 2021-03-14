import * as Actions from '../actions';

const reducer = function (state = Actions.initialStateList, action) {
  switch (action.type) {
    case Actions.RESET_PREVIOUS_SYMPTOM_RESPONSE: {
      return {
        ...state,
        affidavitResult: null,
      }
    }
    case Actions.GET_SYMPTOMS: {
      return {
        ...state,
        data: action.payload,
        originalData: action.payload,
      };
    }
    case Actions.DELETE_SYMPTOM: {
      const newData = state.data.filter((item) => item._id !== action.payload);
      const newOriginalData = state.originalData.filter((item) => item._id !== action.payload);
      return {
        ...state,
        data: newData,
        originalData: newOriginalData,
      };
    }
    case Actions.SUCCESS_SAVE_SYMPTOM: {
      const _filterType = action.filterType;
      const newOriginalData = state.originalData.concat(action.payload);
      let filteredData = state.data;
      if (_filterType === Actions.ALL) {
        filteredData = newOriginalData;
      } else {
        if (state.originalData.length > 0) {
          if(_filterType === Actions.FIT && action.payload.fit === true) {
            filteredData = filteredData.concat(action.payload);
          }
          if(_filterType === Actions.NOT_FIT && action.payload.fit === false) {
            filteredData = filteredData.concat(action.payload);
          }
        }
      }
      return {
        ...state,
        data: filteredData,
        originalData: newOriginalData,
        affidavitResult: action.payload.fit,
      };
    }
    case Actions.SUCCESS_UPDATE_SYMPTOM: {
      const previousData = state.originalData.filter((item) => item._id !== action.payload._id) || [];
      const {filterType} = action;
      const newOriginalData = previousData.concat(action.payload);
      let filteredData = state.data;
      if (filterType === 'all') {
        filteredData = newOriginalData;
      } else {
        if (state.originalData.length > 0) {
          if(filterType === 'fit' && action.payload.fit === true) {
            filteredData = filteredData.concat(action.payload);
          }else if(filterType === 'fit' && action.payload.fit === false) {
            filteredData = state.data.filter((item) => item._id !== action.payload._id);
          }
          if(filterType === 'notfit' && action.payload.fit === false) {
            filteredData = filteredData.concat(action.payload);
          }else if(filterType === 'notfit' && action.payload.fit === true) {
            filteredData = state.data.filter((item) => item._id !== action.payload._id);
          }
        }
      }
      return {
        ...state,
        data: filteredData,
        originalData: newOriginalData,
        affidavitResult: null,
      };
    }
    case Actions.SET_SYMPTOMS_SEARCH_TEXT: {
      return {
        ...state,
        searchText: action.searchText
      };
    }
    case Actions.TOGGLE_IN_SELECTED_SYMPTOMS: {

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
    case Actions.TOGGLE_IN_FIT_SYMPTOMS: {
      const _filterType = action.filterType;

      let filteredData = [];
      if (_filterType === Actions.ALL) {
        filteredData = state.originalData;
      } else {
        const _filter = _filterType === Actions.FIT ? true : false
        if (state.originalData.length > 0) {
          filteredData = state.originalData.filter((item) => item.fit === _filter);
        }
      }

      return {
        ...state,
        data: filteredData,
      };
    }
    case Actions.SELECT_ALL_SYMPTOMS: {
      const arr = Object.keys(state.data).map(k => state.data[k]);

      const selectedIds = arr.map(record => record.id);

      return {
        ...state,
        selectedIds: selectedIds
      };
    }
    case Actions.DESELECT_ALL_SYMPTOMS: {
      return {
        ...state,
        selectedIds: []
      };
    }
    case Actions.OPEN_NEW_SYMPTOM_DIALOG: {
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
    case Actions.CLOSE_NEW_SYMPTOM_DIALOG: {
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
    case Actions.OPEN_EDIT_SYMPTOM_DIALOG: {
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
    case Actions.CLOSE_EDIT_SYMPTOM_DIALOG: {
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