import {
    all,
    call,
    fork,
    put,
    takeEvery,
} from 'redux-saga/effects';
import {
    odoo
} from '../../helpers/Api';
import {
    ADD_HEALTH,
} from "../actions";
import {
    addHealthSuccessAction,
    addHealthFailureAction,
} from './actions';

const addHealthAsync = async (health) =>
    await odoo.create(health)
    .then(data => data)
    .catch(error => error);

function* addHealth({
    payload
}) {
    try {
        const _health = yield call(addHealthAsync, payload);
        if(!_health.hasError) {
            yield put(addHealthSuccessAction(_health));
        } else {
            yield put(addHealthFailureAction(_health.errorMessage));
        }
    } catch (error) {
        yield put(addHealthFailureAction(error));
    }
}

export function* watchAddHealthAction() {
    yield takeEvery(ADD_HEALTH, addHealth);
}

export default function* rootSaga() {
    yield all([
        fork(watchAddHealthAction),
    ]);
}