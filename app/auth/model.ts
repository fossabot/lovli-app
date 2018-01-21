import { User } from "../users/model";

export type Auth = {
	user?: User;
	error?: any;
	loggedIn: boolean;
	loggingIn: boolean;
};

export type IState = Auth;
