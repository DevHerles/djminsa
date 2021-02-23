import {
  PARTNER_ADD_ITEM,
  PARTNER_ADD_ITEM_ERROR,
  PARTNER_ADD_ITEM_SUCCESS,
  PARTNER_GET_LIST,
  PARTNER_GET_LIST_ERROR,
  PARTNER_GET_LIST_SEARCH,
  PARTNER_GET_LIST_SUCCESS,
  PARTNER_GET_LIST_WITH_FILTER,
  PARTNER_GET_LIST_WITH_ORDER,
  PARTNER_SELECTED_ITEMS_CHANGE,
} from "../actions";

const INIT_STATE = {
  allItems: null,
  items: null,
  new: {
    first_name: "",
    last_name: "",
    name: "",
    partner_type: "COLABORADOR",
    doc_type: "DNI",
    doc_number: "45117742",
    dob: "",
    assurance_type: "",
    organ: "",
    organic_unit: "",
    functional_team: "",
    position: "",
    entailment: "",
    working_mode: "",
    health_status_monitoring: false,
    status: "PENDING",
  },
  error: null,
  filter: null,
  searchKeyword: "",
  orderColumn: null,
  loading: false,
  labels: [
    { label: "EDUCATION", color: "secondary" },
    { label: "NEW FRAMEWORK", color: "primary" },
    { label: "PERSONAL", color: "info" },
  ],
  orderColumns: [
    { column: "title", label: "Title" },
    { column: "category", label: "Category" },
    { column: "status", label: "Status" },
    { column: "label", label: "Label" },
  ],
  categories: ["Flexbox", "Sass", "React"],
  selectedItems: [],
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case PARTNER_GET_LIST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case PARTNER_GET_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        allPartnerItems: action.payload,
        partnerItems: action.payload,
      };

    case PARTNER_GET_LIST_ERROR:
      return { ...state, loading: false, error: action.payload };

    case PARTNER_GET_LIST_WITH_FILTER:
      if (action.payload.column === "" || action.payload.value === "") {
        return {
          ...state,
          loading: true,
          partnerItems: state.allPartnerItems,
          filter: null,
        };
      } else {
        const filteredItems = state.allPartnerItems.filter(
          (item) => item[action.payload.column] === action.payload.value
        );
        return {
          ...state,
          loading: true,
          partnerItems: filteredItems,
          filter: {
            column: action.payload.column,
            value: action.payload.value,
          },
        };
      }

    case PARTNER_GET_LIST_WITH_ORDER:
      if (action.payload === "") {
        return {
          ...state,
          loading: true,
          partnerItems: state.partnerItems,
          orderColumn: null,
        };
      } else {
        const sortedItems = state.partnerItems.sort((a, b) => {
          if (a[action.payload] < b[action.payload]) return -1;
          else if (a[action.payload] > b[action.payload]) return 1;
          return 0;
        });
        return {
          ...state,
          loading: true,
          partnerItems: sortedItems,
          orderColumn: state.orderColumns.find(
            (x) => x.column === action.payload
          ),
        };
      }

    case PARTNER_GET_LIST_SEARCH:
      if (action.payload === "") {
        return { ...state, partnerItems: state.allPartnerItems };
      } else {
        const keyword = action.payload.toLowerCase();
        const searchItems = state.allPartnerItems.filter(
          (item) =>
            item.title.toLowerCase().indexOf(keyword) > -1 ||
            item.detail.toLowerCase().indexOf(keyword) > -1 ||
            item.status.toLowerCase().indexOf(keyword) > -1 ||
            item.category.toLowerCase().indexOf(keyword) > -1 ||
            item.label.toLowerCase().indexOf(keyword) > -1
        );
        return {
          ...state,
          loading: true,
          partnerItems: searchItems,
          searchKeyword: action.payload,
        };
      }

    case PARTNER_ADD_ITEM:
      return { ...state, loading: true, error: null };

    case PARTNER_ADD_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        allPartnerItems: action.payload,
        partnerItems: action.payload,
      };

    case PARTNER_ADD_ITEM_ERROR:
      return { ...state, loading: false, error: action.payload };

    case PARTNER_SELECTED_ITEMS_CHANGE:
      return { ...state, loading: false, selectedItems: action.payload };
    default:
      return { ...state };
  }
};

