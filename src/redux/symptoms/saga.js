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
    addSymptomsSuccess,
    addSymptomsFailure,
} from './actions';

const addSymptomsAsync = async (symptoms) =>
    await odoo.create(symptoms)
    .then(data => data)
    .catch(error => error);

function* addSymptoms({
    payload
}) {
    const { symptoms } = payload.symptoms;

    try {
        const _symptoms = yield call(addSymptomsAsync, symptoms);
        if(!_symptoms.hasError) {
            yield put(addSymptomsSuccess(_symptoms));
        } else {
            yield put(addSymptomsFailure(_symptoms.errorMessage));
        }
    } catch (error) {
        yield put(addSymptomsFailure(error));
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