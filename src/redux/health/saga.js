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
    addHealthSuccess,
    addHealthFailure,
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
            yield put(addHealthSuccess(_health));
        } else {
            yield put(addHealthFailure(_health.errorMessage));
        }
    } catch (error) {
        yield put(addHealthFailure(error));
    }
}

export function* watchAddHealth() {
    yield takeEvery(ADD_HEALTH, addHealth);
}

export default function* rootSaga() {
    yield all([
        fork(watchAddHealth),
    ]);
}