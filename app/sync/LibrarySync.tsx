import * as React from 'react';

import {
	Sync
} from './model';

import {
	Settings
} from '../settings/model';
import { syncService } from './sync.service';

var schedule = require('node-schedule');

export interface LibrarySyncProps {
	settings: Settings,
	sync: Sync,
	status: (s:any)=>void;
	outgoing: (o:any)=>void;
	incoming: (i:any)=>void;
	log: (l:any)=>void;
}

class LibrarySync extends React.Component < LibrarySyncProps > {
	jobs: any[] = [];

	componentDidMount() {
		console.log('starting library sync...');
		syncService.status().then(status => this.props.status(status));
		syncService.incoming().then(changes => this.props.incoming(changes));
		syncService.outgoing().then(changes => this.props.outgoing(changes));
		window.setTimeout(this.start.bind(this), 5000);
	}

	componentWillUnmount() {
		this.jobs.forEach((job: any) => {
			job.cancel();
		});

	}

	render() {
		return null;
	}

	start() {
		const self = this;
		if (self.jobs.length < 1) {

			self.jobs.push(schedule.scheduleJob('*/10 * * * * *', function () {
				syncService.status().then(status => self.props.status(status));
			}));

			self.jobs.push(schedule.scheduleJob('*/20 * * * * *', function () {
				syncService.outgoing().then(picks => self.props.outgoing(picks));
				syncService.log().then(log => self.props.log(log));
			}));

			self.jobs.push(schedule.scheduleJob('*/30 * * * * *', function () {
				syncService.incoming().then(summary => self.props.incoming(summary));
			}));
		}
	}


}
export default LibrarySync as any as React.StatelessComponent < LibrarySyncProps > ;
