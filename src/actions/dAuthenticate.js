import api from "./api";

export const ACTION_TYPES = {
    LOGIN: 'LOGIN',
    LOGOUT: 'LOGOUT',
}

const formateData = data => ({
    ...data,
    age: parseInt(data.age ? data.age : 0)
})

export const logout = () => dispatch => {
    api.dAuthenticate().logout()
        .then(response => {
            dispatch({
                type: ACTION_TYPES.LOGOUT,
                payload: response.data
            })
        })
        .catch(err => console.log(err))
}

export const login = (data, onSuccess) => dispatch => {
    data = formateData(data)
    api.dAuthenticate().login(data)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.LOGIN,
                payload: res.data
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}
