import { all, call, fork, put, takeEvery } from "redux-saga/effects";

import { odoo } from "../../helpers/Api";
import healthService from "../../services/health.service";
import { HEALTH_ADD, HEALTH_GET_LIST } from "../actions";

import {
  addHealthFailureAction,
  addHealthSuccessAction,
  getListHealthErrorAction,
  getListHealthSuccessAction,
} from "./actions";

const addAsync = async (values) => {
  return await healthService
    .create(values)
    .then((response) => response)
    .catch((error) => error);
};

function* add({ payload }) {
  try {
    const response = yield call(addAsync, payload);
    if (!response.message) {
      console.log(response.data);
      yield put(addHealthSuccessAction(response.data));
    } else {
      yield put(addHealthFailureAction(response.message));
    }
  } catch (error) {
    yield put(addHealthFailureAction(error));
  }
}

const getListSync = async () => {
  return await healthService
    .getAll()
    .then((response) => response)
    .catch((error) => error);
};

function* getList({ payload }) {
  try {
    const response = yield call(getListSync, payload);
    if (!response.message) {
      yield put(getListHealthSuccessAction(response.data));
    } else {
      yield put(getListHealthErrorAction(response.message));
    }
  } catch (error) {
    yield put(getListHealthErrorAction(error));
  }
}

export function* watchAddAction() {
  yield takeEvery(HEALTH_ADD, add);
}

export function* watchGetListAction() {
  yield takeEvery(HEALTH_GET_LIST, getList);
}
export default function* rootSaga() {
  yield all([fork(watchAddAction), fork(watchGetListAction)]);
}

