


import { IState, SyncStatus, Sync, TypeKeys, SyncIncoming, SyncLog, SyncOutgoing } from './model';
import {  } from './actions';
import { StatusAction, IncomingAction, LogAction, OutgoingAction } from './index';

export type ActionTypes =
| StatusAction
| IncomingAction
| OutgoingAction
| LogAction;

const initialState = <Sync>{
	status: <SyncStatus>{
		not_added: []
	},
	incoming: <SyncIncoming>{
		all: [],
		total: 0,
		loading: true
	},
	outgoing: <SyncOutgoing>{
		all: [],
		total: 0,
		loading: false
	},
	log: <SyncLog>{
		all: [],
		total: 0,
		loading: true
	},
}
export default function createReducer(state: IState = initialState, action: ActionTypes) {

	switch (action.type) {

		case TypeKeys.STATUS:
			return {
				...state,
				status: {
					...action.status,
					loading: false
				}

			}
		case TypeKeys.OUTGOING:
			return {
				...state,
				outgoing: {
					...action.outgoing,
					loading: false
				}
			}
		case TypeKeys.INCOMING:
			return {
				...state,
				incoming: {
					...action.incoming,
					loading: false
				}
			}
		case TypeKeys.LOG:
			return {
				...state,
				log: {
					...action.log,
					loading: false
				}
			}

		default:
			return state;
		}
  }
