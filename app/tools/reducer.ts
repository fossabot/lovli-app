import { handleActions, Action } from 'redux-actions';
import { settingsService } from '../services/settings.service';

import { Tool, IState } from './model';
import {
  ADD_TOOL,
  DELETE_TOOL,
  TOOLS_UPDATE_STATE,
  TOOLS_ENABLE_TOOL,
  COMPLETE_ALL,
  CLEAR_COMPLETED
} from './constants/ActionTypes';

export const initialTools: IState = [<Tool>{
	id: 0,
	text: 'Rekordbox',
	command: 'rekordbox',
	state: 0,
	enabled: true
}, {

	id: 1,
	text: 'Rekord Buddy',
	command: 'Rekord Buddy',
	state: 0,
	enabled: true
}, {

	id: 2,
	text: 'Mixed In Key',
	command: 'Mixed In Key',
	state: 0,
	enabled: true
}, {
	id: 3,
	text: 'Traktor',
	command: 'Traktor',
	state: 0,
	enabled: false
}, {
	id: 4,
	text: 'Serato',
	command: 'serato',
	state: 0,
	enabled: false
}];


let intialState:any = settingsService.get('tools');
if (!intialState) {
  settingsService.set('tools', initialTools);
  intialState = initialTools;
}

export default handleActions<IState, Tool>({

  [ADD_TOOL]: (state: IState, action: Action<Tool>): IState => {
		let result = state;
		if (action.payload) {
			result = [{
				id: state.reduce((maxId, tool) => Math.max(tool.id || 0, maxId), -1) + 1,
				enabled: action.payload.enabled,
				state: action.payload.state,
				text: action.payload.text,
				command: action.payload.command
			}, ...state];
		}
		settingsService.set('tools', result);
		return result;
  },

  [DELETE_TOOL]: (state: IState, action: Action<Tool>): IState => {
    return state.filter(tool =>
      action.payload && tool.id !== action.payload.id
    );
  },

  [TOOLS_UPDATE_STATE]: (state: IState, action: Action<Tool>): IState => {
    return <IState>state.map(tool =>
      action.payload && tool.id === action.payload.id
        ? { ...tool, text: action.payload.text }
        : tool
    );
  },

  [TOOLS_ENABLE_TOOL]: (state: IState, action: Action<Tool>): IState => {

    let newState = <IState>state.map(tool =>
      action.payload && tool.id === action.payload.id ?
        { ...tool, enabled: !tool.enabled } :
        tool
		);
		settingsService.set('tools', newState);

		return newState;
  },

  [COMPLETE_ALL]: (state: IState, action: Action<Tool>): IState => {
    const areAllMarked = state.every(tool => tool.enabled);
    return <IState>state.map(tool => ({ ...tool,
      enabled: !areAllMarked
    }));
  },

  [CLEAR_COMPLETED]: (state: IState, action: Action<Tool>): IState => {
    return state.filter(tool => tool.enabled === false);
	}

}, intialState);
