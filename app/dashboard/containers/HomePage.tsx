import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import Home from '../components/Home';
import { Users } from '../../users/model';
import { connect } from 'react-redux';
import { Sync } from '../../sync/model';

interface HomePageProps extends RouteComponentProps<any> {
	users: Users;
	sync: Sync;
}
class HomePage extends React.Component<HomePageProps> {
  render() {
    return (
      <Home sync={this.props.sync} users={this.props.users} />
    );
  }
}

const mapStateToProps = (state: any) => ({
	users: state.users,
	sync: state.sync
});

export default connect(mapStateToProps)(HomePage);

