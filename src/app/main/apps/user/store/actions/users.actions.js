import usersService from 'app/services/api.service';

export const GET_USERS = 'GET USERS';
export const SET_USERS_SEARCH_TEXT = 'SET USERS SEARCH TEXT';

const path='users';

export function getUsers(path)
{
    const request = usersService.getAll(path);
    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_USERS,
                payload: response.data
            })
        );
}

export function setUsersSearchText(event)
{
    return {
        type      : SET_USERS_SEARCH_TEXT,
        searchText: event.target.value
    }
}
