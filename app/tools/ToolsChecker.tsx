import * as React from 'react';
//import handleActions from '../../tools/reducer';
import {
	Tool
} from './model';
const find = require('find-process');
//const async = require("async");
const exec = require('sync-exec');
import {
	Settings
} from '../settings/model';
var schedule = require('node-schedule');

export interface ToolsProps {
	updateState: (tool: Tool, state: number) => void;
	settings: Settings,
		tools: Tool[]
}

class ToolsChecker extends React.Component < ToolsProps > {
	jobs: any[] = [];

	componentDidMount() {
		console.log('starting tools checker...');
		this.start();
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

			const j = schedule.scheduleJob('*/3 * * * * *', function () {

				self.props.tools.forEach((tool: Tool) => {
					if (tool.enabled) {
						if (self.isInstalled(tool.command)) {
							if (tool.state < 1) {
								tool.state = 1;
								self.props.updateState(tool, 1);
							}
							self._checkTool(tool);
						} else {
							if (tool.state > 0) {
								self.props.updateState(tool, 0);
								tool.state = 0;
							}
						}
					}
				});
			});

			self.jobs.push(j);
		}
	}

	isInstalled(tool: any) {
		return exec(`find . -maxdepth 2 -iname "*${tool}*"`, {
			cwd: '/Applications'
		}).stdout.length > 0;
	}

	_checkTool(tool: any) {

		const me = this;

		//console.log('Checking local %s installation', tool.text);

		find('name', tool.command)
			.then(function (list: any[]) {
				if (list.length > 0) {
					tool.state = 2;
					me.props.updateState(tool, 2);

				} else {
					if (tool.state > 1) {
						tool.state = 1;
						me.props.updateState(tool, 1);
					}
				}

			}, function (err: any) {
				console.log(err.stack || err);
			});

	}
}
export default ToolsChecker as any as React.StatelessComponent < ToolsProps > ;
