



import * as React from 'react';

import { withStyles } from 'material-ui/styles';
import { StyleRulesCallback, WithStyles } from 'material-ui/styles/withStyles';
import { Sync } from '../../model';
import Typography from 'material-ui/Typography/Typography';

import Button from 'material-ui/Button/Button';

import LinearProgress from 'material-ui/Progress/LinearProgress';
import LogTable from '../LogTable';
import { syncService } from '../../sync.service';

type withStyleProps = 'root' | 'formControl' | 'divider' | 'primaryBtn' | 'subheading';


interface PushStepState {
	logs: string[];
	isPushing: boolean;
};
interface PushStepProps {
	sync: Sync,
	commit: (msg:string)=>void;
	complete: ()=>void;
};


const styles: StyleRulesCallback<withStyleProps> = (theme) => ({
	root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
	} as React.CSSProperties,
	primaryBtn: {
		width: '100%',
		maxWidth: 299,
		margin: `${theme.spacing.unit * 3}px auto`
	} as React.CSSProperties,
	divider: {
		marginTop: 28,
		marginBottom: 28,
  } as React.CSSProperties,
  subheading: {
	  marginTop: 16
  } as React.CSSProperties,
  formControl: {
		width: '100%',
    margin: theme.spacing.unit,
  } as React.CSSProperties,
});


class PushStep extends React.Component<PushStepProps & WithStyles<withStyleProps>, PushStepState> {
	state = {
		logs: [],
		isPushing: false
	};

	handlePush = () => {
		this.setState({ ...this.state, isPushing: true })

		syncService.push((command: any, stdout: any, stderr: any) => {
			this.setState({ ...this.state, logs: [
				...this.state.logs,
				command
			]});

			this._streamLogs(stdout);
			this._streamLogs(stderr);

		}).then(log =>  {
			this.setState({...this.state, isPushing:false});
			window.setTimeout(this.props.complete, 2000);
		}).catch((err:any) => {
			console.error('cannot push', err);
			alert('Shit, push hät nöd funktioniert :/');
		});


	}

	_streamLogs = (stream:any) => {
		stream.on('data', (chunk:any) => {
		  //chunks.push(chunk.toString());
		  console.log('DATA', chunk.toString());
		  this.setState({ ...this.state, logs: [
			...this.state.logs,
			chunk.toString()
		]});
		});
		stream.on('end', () => {
			console.log('END');
			this.setState({ ...this.state, logs: [
				...this.state.logs,
				'Finished!'
			]});
		});
	  }

  render() {
    const { sync, classes} = this.props;
		const {isPushing, logs} = this.state;
  return (
		<div>

		{isPushing ? (
			<section>
				<Typography type="subheading" gutterBottom>
					Uno momento, pushing on!
				</Typography>

				<LinearProgress />



				<Button disabled className={classes.primaryBtn} color="primary" >abbrächä</Button>

			</section>
		) : (
			<section>
			{(sync && sync.outgoing && sync.outgoing.total > 0) ? (
				<div>

					<Typography type="subheading" gutterBottom>
						Ab id Lövli Cloud
					</Typography>
					<Typography type="caption">
						Folgendi Sessions sind ready zum ufelade:
					</Typography>

					<LogTable log={sync.outgoing} />

					<Button raised className={classes.primaryBtn} color="primary" onClick={this.handlePush}>PUSH!</Button>

				</div>
			): (
				<div className="center-text">
				<Typography type="subheading" gutterBottom>
						Git nüt zum pushe.
				</Typography>

				<Button raised className={classes.primaryBtn} color="primary" onClick={()=> this.props.complete()}>OK, check Incoming!</Button>
				</div>

			)}

			</section>
		)}


			<div>
				{logs && logs.map((log:any, k:number) => {
					return (
						<Typography type="body2" gutterBottom key={k}>
							{ log }
						</Typography>
					);

				})}
			</div>

		</div>
	  );
	}
}


const rootComponent = withStyles(styles)<{}>(PushStep);
export default rootComponent as any as React.StatelessComponent<PushStepProps>;
