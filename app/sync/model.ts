export type Sync = {
	status: any;
	incoming: SyncIncoming;
	outgoing: SyncOutgoing;
	log: SyncLog;
};

export type SyncOutgoing = {
	all: SyncLogEntry[];
	latest?: SyncLogEntry;
	total: number;
	loading: boolean;
};

export type SyncIncoming = {
	all: SyncLogEntry[];
	latest?: SyncLogEntry;
	total: number;
	loading: boolean;
};

export type SyncLog = {
	all: SyncLogEntry[];
	latest?: SyncLogEntry;
	total: number;
	loading: boolean;
};


export type SyncLogEntry = {
	type: string;
	hash: string;
	date: string;
	message: string;
	author_name: string;
	author_email: string
};

export type SyncStatus = {
	not_added: any[];
};

export type IState = Sync;

export enum TypeKeys {
	STATUS = "Sync/STATUS",
	OUTGOING = "Sync/OUTGOING",
	INCOMING = "Sync/INCOMING",
	LOG = "Sync/LOG",
	DIFF = "Sync/DIFF",
	OTHER_ACTION = "__any_other_action_type__"
}
