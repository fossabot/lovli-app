export type Tool = {
	id?: number;
	state: number;
	command: string;
	text: string;
	enabled: boolean;
};

export type IState = Tool[];
