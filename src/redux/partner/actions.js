import {
    ADD_PARTNER,
    ADD_PARTNER_SUCCESS,
    ADD_PARTNER_FAILURE,
    PARTNER_GET_LIST,
    PARTNER_GET_LIST_SUCCESS,
    PARTNER_GET_LIST_ERROR,
    PARTNER_GET_LIST_WITH_FILTER,
    PARTNER_GET_LIST_WITH_ORDER,
    PARTNER_GET_LIST_SEARCH,
    PARTNER_ADD_ITEM,
    PARTNER_ADD_ITEM_SUCCESS,
    PARTNER_ADD_ITEM_ERROR,
    PARTNER_SELECTED_ITEMS_CHANGE
} from "../actions";

export const addPartnerAction = (partner) => ({
    type: ADD_PARTNER,
    payload: partner,
});

export const addPartnerSuccessAction = (partner) => ({
    type: ADD_PARTNER_SUCCESS,
    payload: partner,
});

export const addPartnerFailureAction = (error) => ({
    type: ADD_PARTNER_FAILURE,
    payload: error,
});

export const getPartnerList = () => ({
    type: PARTNER_GET_LIST
});

export const getPartnerListSuccess = (items) => ({
    type: PARTNER_GET_LIST_SUCCESS,
    payload: items
});

export const getPartnerListError = (error) => ({
    type: PARTNER_GET_LIST_ERROR,
    payload: error
});

export const getPartnerListWithFilter = (column, value) => ({
    type: PARTNER_GET_LIST_WITH_FILTER,
    payload: { column, value }
});

export const getPartnerListWithOrder = (column) => ({
    type: PARTNER_GET_LIST_WITH_ORDER,
    payload: column
});

export const getPartnerListSearch = (keyword) => ({
    type: PARTNER_GET_LIST_SEARCH,
    payload: keyword
});

export const addPartnerItem = (item) => ({
    type: PARTNER_ADD_ITEM,
    payload: item
});

export const addPartnerItemSuccess = (items) => ({
    type: PARTNER_ADD_ITEM_SUCCESS,
    payload: items
});

export const addPartnerItemError = (error) => ({
    type: PARTNER_ADD_ITEM_ERROR,
    payload: error
});

export const selectedPartnerItemsChange = (selectedItems) => ({
    type: PARTNER_SELECTED_ITEMS_CHANGE,
    payload: selectedItems
});
