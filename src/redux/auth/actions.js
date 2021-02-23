import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGOUT_USER,
  REGISTER_USER,
  REGISTER_USER_SUCCESS
} from '../actions';

export const loginUser = (user, history) => ({
  type: LOGIN_USER,
  payload: {
    user,
    history
  }
});
export const loginUserSuccess = (user) => ({
  type: LOGIN_USER_SUCCESS,
  payload: user
});

export const loginUserFailure = (error) => ({
  type: LOGIN_USER_FAILURE,
  payload: error
});

export const registerUser = (user, history) => ({
  type: REGISTER_USER,
  payload: {
    user,
    history
  }
})
export const registerUserSuccess = (user) => ({
  type: REGISTER_USER_SUCCESS,
  payload: user
})

export const logoutUser = (history) => ({
  type: LOGOUT_USER,
  payload: {
    history
  }
});