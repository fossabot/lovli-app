


import { IState, ToolSettings, Settings, TypeKeys } from './model';
import { RestartChecksAction, UpdateToolSettings } from './actions';

export type ActionTypes =
| RestartChecksAction
| UpdateToolSettings;

const initialState = <Settings>{
	tools: <ToolSettings>{
		restartingChecks: false,
		running: [],
		runToolChecks: true
	}
}
export default function createReducer(state: IState = initialState, action: ActionTypes) {

	switch (action.type) {

		case TypeKeys.TOOLS_ENABLE_TOOL:
			return {
				...state,
				tools: {
					...state.tools,
					restartingChecks: true
				},
			}

		case TypeKeys.RESTART_CHECKS:
			return {
				...state,
				tools: {
					...state.tools,
					restartingChecks: action.restart
				}
			}
		default:
			return state;
		}
  }
