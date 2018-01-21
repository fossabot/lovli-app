import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as React from 'react';


import MainSyncCard from '../components/MainSyncCard';
import { Sync } from '../model';
import { syncService } from '../sync.service';
import SyncDialog from '../components/SyncDialog';
import { updateOutgoing } from '../index';

interface SyncProps {
	sync: Sync;
	dispatch: Dispatch<{}>;
}

class SyncPage extends React.Component<SyncProps> {

	handleCommit(msg: string) {
		syncService.commit(msg);
	}

	handlePull() {
		syncService.pull().then((result) => {
			console.log('pull result', result);
	 });
	}
  render() {
		const { sync, dispatch } = this.props;
    return (
      <div className="toolapp">
				<SyncDialog sync={sync}
						commit={(msg: string) => this.handleCommit(msg)}
						outgoing={(out: any) => dispatch(updateOutgoing(out))}
						pull={() => this.handlePull()}/>

				<MainSyncCard sync={sync} />
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
	sync: state.sync
});

export default connect(mapStateToProps)(SyncPage);
