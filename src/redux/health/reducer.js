import {
  HEALTH_ADD,
  HEALTH_ADD_FAILURE,
  HEALTH_ADD_SUCCESS,
  HEALTH_GET_LIST,
  HEALTH_GET_LIST_ERROR,
  HEALTH_GET_LIST_SUCCESS,
} from "../actions";

const INIT_STATE = {
  items: [],
  searchKeyword: "",
  orderColumn: [],
  orderColumns: [],
  selectedItems: [],
  form: {
    q1: "",
    q2: "",
    q3: "",
    q4: "",
    q5: "",
    q6: "",
    q7: "",
    q8: "",
    q9: "",
    q10: "",
    q11: "",
    q12_detail: "",
    q13: false,
  },
  loading: false,
  error: null,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case HEALTH_ADD:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case HEALTH_ADD_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        health: action.payload,
      };
    case HEALTH_ADD_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case HEALTH_GET_LIST:
      return { ...state, loading: true, error: null };
    case HEALTH_GET_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        // list: { ...state.list, items: action.payload, loading: false },
        items: action.payload,
      };
    default:
      return { ...state };
  }
};
