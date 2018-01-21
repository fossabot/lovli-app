import {
	TypeKeys, SyncStatus, SyncIncoming, SyncLog, SyncOutgoing
} from './model';

export interface StatusAction {
	type: TypeKeys.STATUS;
	status: SyncStatus;
}

export interface OutgoingAction {
	type: TypeKeys.OUTGOING
	outgoing: SyncOutgoing;
}

export interface IncomingAction {
	type: TypeKeys.INCOMING
	incoming: SyncIncoming;
}
export interface LogAction {
	type: TypeKeys.LOG
	log: SyncLog;
}

export interface DiffAction {
	type: TypeKeys.DIFF;
	diff: any;
}



export interface OtherAction {
    type: TypeKeys.OTHER_ACTION;
  }


	export const updateLog = (l: SyncLog): LogAction => ({
		type: TypeKeys.LOG,
		log: l
	})

	export const updateOutgoing = (o: SyncOutgoing): OutgoingAction => ({
		type: TypeKeys.OUTGOING,
		outgoing: o
	})
	export const updateIncoming = (i: SyncIncoming): IncomingAction => ({
		type: TypeKeys.INCOMING,
		incoming: i
	})



export const updateStatus = (s: SyncStatus): StatusAction => ({
  type: TypeKeys.STATUS,
  status: s
})

export const updateDiff = (s: any): DiffAction => ({
  type: TypeKeys.DIFF,
  diff: s
})
