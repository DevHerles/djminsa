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
    LOGOUT_USER
} from '../actions';

import {
    loginUserSuccess,
    loginUserFailure,
    registerUserSuccess,
} from './actions';

const loginWithEmailPasswordAsync = async (email, password) =>
    await AuthService.loginWithEmailAndPassword(email, password)
    .then(authUser => authUser)
    .catch(error => error);

function* loginWithEmailPassword({
    payload
}) {
    const {
        email,
        password
    } = payload.user;
    const {
        history
    } = payload;
    try {
        const loginUser = yield call(loginWithEmailPasswordAsync, email, password);
        if (!loginUser.data.message) {
            localStorage.setItem('jwt_token', loginUser.data.token);
            yield put(loginUserSuccess(loginUser.data.token));
            history.push('/');
        } else {
            console.log('login failed :', loginUser.data.message);
            yield put(loginUserFailure(loginUser.data.message));
        }
    } catch (error) {
        console.log('login error : ', error)
    }
}

const registerWithEmailPasswordAsync = async (email, password) =>
    await AuthService.createUserWithEmailAndPassword(email, password)
    .then(authUser => authUser)
    .catch(error => error);

function* registerWithEmailPassword({
    payload
}) {
    const {
        email,
        password
    } = payload.user;
    const {
        history
    } = payload
    try {
        const registerUser = yield call(registerWithEmailPasswordAsync, email, password);
        if (!registerUser.data.message) {
            localStorage.setItem('jwt_token', registerUser.user.uid);
            yield put(registerUserSuccess(registerUser));
            history.push('/')
        } else {
            console.log('register failed :', registerUser.data.message)
        }
    } catch (error) {
        console.log('register error : ', error)
    }
}

const logoutAsync = async (history) => {
    await AuthService.signOut().then(authUser => authUser).catch(error => error);
    history.push('/')
}

function* logout({
    payload
}) {
    const {
        history
    } = payload
    try {
        yield call(logoutAsync, history);
        localStorage.removeItem('jwt_token');
    } catch (error) {}
}

export function* watchRegisterUser() {
    yield takeEvery(REGISTER_USER, registerWithEmailPassword);
}

export function* watchLoginUser() {
    yield takeEvery(LOGIN_USER, loginWithEmailPassword);
}

export function* watchLogoutUser() {
    yield takeEvery(LOGOUT_USER, logout);
}

export default function* rootSaga() {
    yield all([
        fork(watchLoginUser),
        fork(watchLogoutUser),
        fork(watchRegisterUser)
    ]);
}