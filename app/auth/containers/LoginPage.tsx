import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as React from 'react';

import {
	login, logout
} from '../../users';
import Login from '../components/Login';
import { Auth } from '../model';
import { User } from '../../users/model';

interface AppProps {
	auth: Auth,
	users: User[],
  dispatch: Dispatch<{}>;
}

class LoginPage extends React.Component<AppProps> {

	componentWillMount() {
		this.props.dispatch(logout());
	}

  render() {
    const { auth, users, dispatch } = this.props;

    return (
			<Login
				users={users}
				auth={auth}
				login={(s,p) => dispatch(login(s, p))}/>
    );
  }
}

const mapStateToProps = (state: any) => ({
	auth: state.auth,
	users: state.users.users
});

export default connect(mapStateToProps)(LoginPage);
