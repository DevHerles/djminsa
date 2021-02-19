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
    ADD_SYMPTOMS,
} from "../actions";
import {
    addSymptomsSuccessAction,
    addSymptomsFailureAction,
} from './actions';

const addSymptomsAsync = async (symptoms) =>
    await odoo.create(symptoms)
    .then(data => data)
    .catch(error => error);

function* addSymptoms({
    payload
}) {
    try {
        const _symptoms = yield call(addSymptomsAsync, payload);
        if(!_symptoms.hasError) {
            yield put(addSymptomsSuccessAction(_symptoms));
        } else {
            yield put(addSymptomsFailureAction(_symptoms.errorMessage));
        }
    } catch (error) {
        yield put(addSymptomsFailureAction(error));
    }
}

export function* watchAddSymptoms() {
    yield takeEvery(ADD_SYMPTOMS, addSymptoms);
}

export default function* rootSaga() {
    yield all([
        fork(watchAddSymptoms),
    ]);
}