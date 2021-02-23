import { all } from 'redux-saga/effects';
import authSagas from './auth/saga';
import healthSagas from './health/saga';
import symptomsSagas from './symptoms/saga';
import partnerSagas from './partner/saga';

export default function* rootSaga(getState) {
  yield all([
    authSagas(),
    healthSagas(),
    symptomsSagas(),
    partnerSagas(),
  ]);
}
