import * as React from 'react';

import { Auth } from '../model';
import UserButtons from './UserButtons'
import { User } from '../../users/model';

interface LoginProps {
	auth: Auth;
	users: User[];
	login: (s: string, p: string)=>void;
};

class Login extends React.Component<LoginProps> {


  render() {
	const { auth, login, users } = this.props;
    return (
			<div>
				<h1>Sali hoi!</h1>
				<p>Säg wer bisch den Du?</p>
				<UserButtons auth={auth} login={login} users={users} />
			</div>
    );
  }

}

export default Login;
