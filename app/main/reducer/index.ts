import { combineReducers } from 'redux';

import tools from '../../tools';
import auth from '../../auth';
import settings from '../../settings';
import sync from '../../sync';

import users  from '../../users';

const rootReducer = combineReducers({
	tools,
	users,
	auth,
	settings,
	sync
});

export default rootReducer;
