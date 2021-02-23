import {
    all,
    call,
    fork,
    put,
    takeEvery
} from 'redux-saga/effects';

import AuthService from '../../services/auth.service';
import localStorage from '../../services/localStorageService';

import {
    LOGIN_USER,
    REGISTER_USER,
    LOGOUT_USER,
    DEPARTMENT_GET_LIST
} from '../actions';

import {
    getDepartmentsListSuccess,
    getDepartmentsListError,
    getProvincesListSuccess,
    getProvincesListError,
    getDistrictsListSuccess,
    getDistrictsListError,
} from './actions';

import departments from '../../data/departments.json';
import provinces from '../../data/province.json';
import districts from '../../data/district.json';


const getDepartmentsListRequest = async () => {
    return await new Promise((success, fail) => {
            setTimeout(() => {
                success(departments.data);
            }, 100);
        })
        .then(response => response)
        .catch(error => error);
};

function* getDepartmentsListItems() {
    try {
        const response = yield call(getDepartmentsListRequest);
        yield put(getDepartmentsListSuccess(response));
    } catch (error) {
        yield put(getDepartmentsListError(error));
    }
}

const getProvincesListRequest = async () => {
    return await new Promise((success, fail) => {
            setTimeout(() => {
                success(provinces.data);
            }, 200);
        })
        .then(response => response)
        .catch(error => error);
};

function* getProvincesListItems() {
    try {
        const response = yield call(getProvincesListRequest);
        yield put(getProvincesListSuccess(response));
    } catch (error) {
        yield put(getProvincesListError(error));
    }
}

const getDistrictsListRequest = async () => {
    return await new Promise((success, fail) => {
            setTimeout(() => {
                success(districts.data);
            }, 300);
        })
        .then(response => response)
        .catch(error => error);
};

function* getDistrictsListItems() {
    try {
        const response = yield call(getDistrictsListRequest);
        yield put(getDistrictsListSuccess(response));
    } catch (error) {
        yield put(getDistrictsListError(error));
    }
}

export function* watchGetDepartmentsList() {
    yield takeEvery(DEPARTMENT_GET_LIST, getDepartmentsListItems);
}

export function* watchGetProvincesList() {
    yield takeEvery(PROVINCE_GET_LIST, getProvincesListItems);
}

export function* watchGetDistrictsList() {
    yield takeEvery(DISTRICT_GET_LIST, getDistrictsListItems);
}

export default function* rootSaga() {
    yield all([
        fork(watchGetDepartmentsList),
        fork(watchGetProvincesList),
        fork(watchGetDistrictsList)
    ]);
}