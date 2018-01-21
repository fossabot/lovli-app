

import { handleActions, Action } from 'redux-actions';

import { IState, Auth } from './model';
import {
	LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_ERROR
} from './constants/ActionTypes';

const initialState: IState = {
	loggedIn: false,
	loggingIn: false
};

export default handleActions<IState, Auth>({
  [LOGIN_REQUEST]: (state: IState, action: Action<Auth>): IState => {
	if (action.payload) {
		return {
			loggedIn: false,
			loggingIn: true,
			user: action.payload.user
		}
	}
	return state
  },

  [LOGIN_SUCCESS]: (state: IState, action: Action<Auth>): IState => {
	if (action.payload) {
		return {
				user: action.payload.user,
				loggingIn: false,
				loggedIn: true,
			}

		}
	return state;
	},

	[LOGIN_ERROR]: (state: IState, action: Action<Auth>): IState => {
		if (action.payload) {
			return {
				loggedIn: state.loggedIn,
				loggingIn: false,
				user: state.user,
				error: action.payload.error
			}
		}
		return state;
	}


}, initialState);
