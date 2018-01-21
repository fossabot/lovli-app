export type User = {
	id?: number;
	avatar: string;
	name: string;
	username: string;
	password: string;
	branch: string;
};
export type Users = {
	error?: any;
	loading?: boolean;
	users: User[];
};
export type IState = Users;
