import * as React from 'react';



import { Switch, Route } from 'react-router';
import App from './main/containers/App';
import HomePage from './dashboard/containers/HomePage';
import withStyles, { WithStyles, StyleRulesCallback } from 'material-ui/styles/withStyles';
import withRoot from './main/withRoot';
import SettingsPage from './settings/containers/SettingsPage';
import LoginPage from './auth/containers/LoginPage';
import { PrivateRoute } from './main/PrivateRoute';
import SyncPage from './sync/containers/SyncPage';

const styles: StyleRulesCallback<'root'> = theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 20,
  },
});

type State = {
  open: boolean,
};

class Routes extends React.Component<WithStyles<'root'>, State> {
  state = {
		open: false,

	};

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  handleClick = () => {
    this.setState({
      open: true,
    });
  };

  render() {
    return (
      <App>
				<Switch>
					<PrivateRoute path="/settings" component={SettingsPage} />
					<PrivateRoute path="/sync" component={SyncPage} />

					<Route path="/login" component={LoginPage} />

					<PrivateRoute path="/" exact component={HomePage} />
				</Switch>
			</App>
    );
  }
}

export default withRoot(withStyles(styles)<{}>(Routes));
