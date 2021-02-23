import {
  DEPARTMENT_GET_LIST,
  DEPARTMENT_GET_LIST_SUCCESS,
  DEPARTMENT_GET_LIST_ERROR,
  DEPARTMENT_GET_LIST_WITH_FILTER,
  PROVINCE_GET_LIST,
  PROVINCE_GET_LIST_SUCCESS,
  PROVINCE_GET_LIST_ERROR,
  PROVINCE_GET_LIST_WITH_FILTER,
  DISTRICT_GET_LIST,
  DISTRICT_GET_LIST_SUCCESS,
  DISTRICT_GET_LIST_ERROR,
  DISTRICT_GET_LIST_WITH_FILTER,
} from '../actions';


export const getDepartmentList = () => ({
  type: DEPARTMENT_GET_LIST
});

export const getDepartmentListSuccess = (items) => ({
  type: DEPARTMENT_GET_LIST_SUCCESS,
  payload: items
});

export const getDepartmentListError = (error) => ({
  type: DEPARTMENT_GET_LIST_ERROR,
  payload: error
});

export const getDepartmentListWithFilter = (column, value) => ({
  type: DEPARTMENT_GET_LIST_WITH_FILTER,
  payload: { column, value }
});

export const getProvinceList = () => ({
  type: PROVINCE_GET_LIST
});

export const getProvinceListSuccess = (items) => ({
  type: PROVINCE_GET_LIST_SUCCESS,
  payload: items
});

export const getProvinceListError = (error) => ({
  type: PROVINCE_GET_LIST_ERROR,
  payload: error
});

export const getProvinceListWithFilter = (column, value) => ({
  type: PROVINCE_GET_LIST_WITH_FILTER,
  payload: { column, value }
});

export const getDistrictList = () => ({
  type: DISTRICT_GET_LIST
});

export const getDistrictListSuccess = (items) => ({
  type: DISTRICT_GET_LIST_SUCCESS,
  payload: items
});

export const getDistrictListError = (error) => ({
  type: DISTRICT_GET_LIST_ERROR,
  payload: error
});

export const getDistrictListWithFilter = (column, value) => ({
  type: DISTRICT_GET_LIST_WITH_FILTER,
  payload: { column, value }
});
