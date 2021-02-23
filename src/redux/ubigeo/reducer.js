import {
    DEPARTMENT_GET_LIST,
    DEPARTMENT_GET_LIST_SUCCESS,
    DEPARTMENT_GET_LIST_ERROR,
    PROVINCE_GET_LIST,
    PROVINCE_GET_LIST_SUCCESS,
    PROVINCE_GET_LIST_ERROR,
    PROVINCE_GET_LIST_WITH_FILTER,
    DISTRICT_GET_LIST,
    DISTRICT_GET_LIST_SUCCESS,
    DISTRICT_GET_LIST_ERROR,
    DISTRICT_GET_LIST_WITH_FILTER,
} from '../actions';

import localStorage from '../../services/localStorageService';

import departments from '../../data/department.json';
import provinces from '../../data/province.json';
import districts from '../../data/district.json';

const INIT_STATE = {
    departments: departments.data,
    allProvinces: provinces.data,
    allDistricts: districts.data,
    provinces: [],
    districts: [],
    loading: false,
    error: "",
    filter: null,
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case DEPARTMENT_GET_LIST:
            return {
                ...state, departments: [], provinces: [], districts: [], loading: true, error: "",
            };
        case DEPARTMENT_GET_LIST_SUCCESS:
            return {
                ...state, loading: false, departments: action.payload,
            };
        case DEPARTMENT_GET_LIST_ERROR:
            return {
                ...state, loading: false, error: action.payload,
            };
        case PROVINCE_GET_LIST:
            return {
                ...state, provinces: [], districts: [], loading: true, error: "",
            };
        case PROVINCE_GET_LIST_SUCCESS:
            return {
                ...state, loading: false, provinces: action.payload,
            };
        case PROVINCE_GET_LIST_ERROR:
            return {
                ...state, loading: false, error: action.payload,
            };
        case PROVINCE_GET_LIST_WITH_FILTER:
            if (action.payload.column === '' || action.payload.value === '') {
                return {
                    ...state,
                    loading: true,
                    provinces: state.provinces,
                    filter: null
                };
            } else {
                const filteredItems = state.allProvinces.filter((item) =>
                    item[action.payload.column] === action.payload.value);
                return {
                    ...state,
                    loading: true,
                    provinces: filteredItems,
                    filter: {
                        column: action.payload.column,
                        value: action.payload.value
                    }
                }
            };
        case DISTRICT_GET_LIST:
            return {
                ...state, districts: [], loading: true, error: "",
            };
        case DISTRICT_GET_LIST_SUCCESS:
            return {
                ...state, loading: false, districts: action.payload,
            };
        case DISTRICT_GET_LIST_ERROR:
            return {
                ...state, loading: false, error: action.payload,
            };
        case DISTRICT_GET_LIST_WITH_FILTER:
            if (action.payload.column === '' || action.payload.value === '') {
                return {
                    ...state,
                    loading: true,
                    districts: state.districts,
                    filter: null
                };
            } else {
                const filteredItems = state.allDistricts.filter((item) =>
                    item[action.payload.column] === action.payload.value);
                return {
                    ...state,
                    loading: true,
                    districts: filteredItems,
                    filter: {
                        column: action.payload.column,
                        value: action.payload.value
                    }
                }
            };
        default:
            return {
                ...state
            };
    }
}