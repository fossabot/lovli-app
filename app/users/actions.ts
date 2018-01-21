import { userService } from '../services';
import { history } from '../utils/';

//import { history } from '.utils/history.utils'
import {
	LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT
} from '../auth/constants/ActionTypes';

import {
	GETALL_REQUEST, GETALL_SUCCESS, GETALL_ERROR,
	REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_ERROR,
	DELETE_REQUEST, DELETE_SUCCESS, DELETE_ERROR
} from '../users/constants/ActionTypes';
import { syncService } from '../sync/sync.service';
export  {
    login,
    logout,
    register,
    getAll,
    deleteUser
};

function login(username: string, password: string) {
    return (dispatch: Function) => {
        dispatch(request({ username }));

        userService.login(username, password)
            .then(
                user => {

					syncService.branchLocal().then(
						summary => {

							if (summary.current !== user.branch) {
								syncService.checkout(user.branch).then(res => {

									console.log('CHECKOUT', res);

									dispatch(success(user));
									history.push('/');
								},
								error => {
									dispatch(failure(error));
								});
							} else {
								dispatch(success(user));
								history.push('/');
							}

						},
						error => {
							dispatch(failure(error));
						},
					);
                },
                error => {
                    dispatch(failure(error));
                    //dispatch(alertActions.error(error));
                }
            );
    };

    function request(user: any) { return { type: LOGIN_REQUEST, user } }
    function success(user: any) { return { type: LOGIN_SUCCESS, user } }
    function failure(error: string) { return { type: LOGIN_ERROR, error } }
}

function logout() {
    userService.logout();
    return { type: LOGOUT };
}

function register(user: any) {
    return (dispatch: Function) => {
        dispatch(request(user));

        userService.register(user)
            .then(
                user => {
                    dispatch(success(user));
                    //history.push('/login');
                    //dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    dispatch(failure(error));
                    //dispatch(alertActions.error(error));
                }
            );
    };

    function request(user: any) { return { type: REGISTER_REQUEST, user } }
    function success(user: any) { return { type: REGISTER_SUCCESS, user } }
    function failure(error: string) { return { type: REGISTER_ERROR, error } }
}

function getAll() {
    return (dispatch: Function) => {
        dispatch(request());

        userService.getAll()
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: GETALL_REQUEST } }
    function success(users: any) { return { type: GETALL_SUCCESS, users } }
    function failure(error: string) { return { type: GETALL_ERROR, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function deleteUser(id: any) {
    return (dispatch: Function) => {
        dispatch(request(id));

        userService.delete(id)
            .then(
                user => {
                    dispatch(success(id));
                },
                error => {
                    dispatch(failure(id, error));
                }
            );
    };

    function request(id: any) { return { type: DELETE_REQUEST, id } }
    function success(id: any) { return { type: DELETE_SUCCESS, id } }
    function failure(id: any, error: string) { return { type: DELETE_ERROR, id, error } }
}
