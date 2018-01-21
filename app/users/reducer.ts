import { handleActions, Action, BaseAction } from 'redux-actions';

import { Users, IState } from './model';
import {
  GETALL_REQUEST, GETALL_SUCCESS, GETALL_ERROR
} from './constants/ActionTypes';
import { settingsService } from '../services/settings.service';


let initialUsers:any[] = settingsService.get('users') || [] ;

if (initialUsers.length < 1) {
	initialUsers = [
		{
			id: 0,
			username: 'master',
			branch: 'master',
			avatar: '../resources/avatars/lovli-master.png',
			name: 'Master',
			password: 'master'
		}];
		settingsService.set('users', initialUsers)
}

const initialState: IState = {
	loading: true,
	users: initialUsers
};

export default handleActions<IState, Users>({
  [GETALL_REQUEST]: (state: IState, action: BaseAction): IState => {
		return {
			...state,
			loading: true
		}
  },

  [GETALL_SUCCESS]: (state: IState, action: Action<Users>): IState => {

		const newState = {
			...state,
			loading: false,
		}
		if (action.payload) {
			newState.users = action.payload.users
		}

		return newState;
	},

	[GETALL_ERROR]: (state: IState, action: Action<Users>): IState => {
		const newState = {
			...state,
			loading: false,
		}
		if (action.payload) {
			newState.users = [];
			newState.error = action.payload.error || 'failed to retrieve users'
		}
		return newState;
	}


}, initialState);
