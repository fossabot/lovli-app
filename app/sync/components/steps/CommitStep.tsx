



import * as React from 'react';

import { withStyles } from 'material-ui/styles';
import { StyleRulesCallback, WithStyles } from 'material-ui/styles/withStyles';
import { Sync } from '../../model';
import Typography from 'material-ui/Typography/Typography';
import Divider from 'material-ui/Divider/Divider';
import FormControl from 'material-ui/Form/FormControl';
import InputLabel from 'material-ui/Input/InputLabel';
import Input from 'material-ui/Input/Input';
import FormHelperText from 'material-ui/Form/FormHelperText';
import Button from 'material-ui/Button/Button';
import SyncStatusTable from '../SyncStatusTable';
import LogTable from '../LogTable';
import ExpansionPanel from 'material-ui/ExpansionPanel/ExpansionPanel';
import ExpansionPanelSummary from 'material-ui/ExpansionPanel/ExpansionPanelSummary';
import ExpansionPanelDetails from 'material-ui/ExpansionPanel/ExpansionPanelDetails';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import { syncService } from '../../sync.service';
import CircularProgress from 'material-ui/Progress/CircularProgress';

type withStyleProps = 'root' | 'progress' | 'formControl' | 'divider' | 'primaryBtn' |  'panel' | 'subheading' |'panelheading' | 'panelseconddaryheading';


interface CommitStepState {
	message: string;
	hasMessage: boolean;
	isReadyToCommit: boolean;
	isCommitting: boolean;
};
interface CommitStepProps {
	sync: Sync,
	commit: (msg:string)=>void;
	outgoing: (out:any)=>void;
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
	  panel: {
		  marginTop: 60
	  } as React.CSSProperties,
	panelheading: {
		fontSize: theme.typography.pxToRem(15),
		flexBasis: '33.33%',
		flexShrink: 0,
	}as React.CSSProperties,
	panelseconddaryheading: {
		fontSize: theme.typography.pxToRem(15),
		color: theme.palette.text.secondary,
	}as React.CSSProperties,


	subheading: {
		marginTop: 16
	} as React.CSSProperties,
	progress: {
		width: '100%',
		maxWidth: 299,
		margin: `${theme.spacing.unit * 3}px auto`
	} as React.CSSProperties,
  	formControl: {
		width: '100%',
    margin: theme.spacing.unit,
  } as React.CSSProperties,
});


class CommitStep extends React.Component<CommitStepProps & WithStyles<withStyleProps>, CommitStepState> {
	state = {
		message: '',
		hasMessage: false,
		isReadyToCommit: false,
		isCommitting: false
	};

	handleCommit = (e:any) => {

		syncService.commit(this.state.message).then(log =>  {
			this.setState({ ...this.state, isReadyToCommit: false, isCommitting: true })
			syncService.outgoing().then(picks => this.props.outgoing(picks));

			window.setTimeout(this.props.complete, 2000);
		});

	}

	handleMessageChange = (e:any) => {
		const val = e.target.value;
		const isNotEmpty = val.length > 0;
		this.setState({ ...this.state, hasMessage: isNotEmpty, message: val });
	}

  render() {
    const { sync, classes} = this.props;
		const {isReadyToCommit, isCommitting} = this.state;
  return (
		<div>


		{isCommitting ? (
			<div className="text-center">
				<CircularProgress className={classes.progress} />
			</div>
		) : (
			isReadyToCommit ? (
				<section>
					<Typography type="subheading" gutterBottom>
						Was macht dini Änderig?
					</Typography>
					<FormControl className={classes.formControl} aria-describedby="name-helper-text">
						<InputLabel htmlFor="name-helper">Beschriibig</InputLabel>
						<Input id="name-helper"
								value={this.state.message}
								multiline
								rows="4"
								rowsMax="16"
								error={!this.state.hasMessage} onChange={this.handleMessageChange} />
						<FormHelperText id="name-helper-text">Beschriib dini Änderig möglischt churz und prägnant.</FormHelperText>
					</FormControl>
					<Button raised disabled={!this.state.hasMessage} className={classes.primaryBtn} color="primary" onClick={this.handleCommit}>Commit</Button>

				</section>
			) : (
				<section>

				{(sync && sync.status && sync.status.files &&  sync.status.files.length > 0) ? (
					<div>
						<Typography type="subheading" gutterBottom>
							Beschriibig
						</Typography>
						<Typography>
							Schiint als hetsch no lokali änderige wod nanig committed häsch:
						</Typography>

						<Divider className={classes.divider} />

						<SyncStatusTable files={sync.status.files} hideHeader/>


						<Button raised className={classes.primaryBtn} color="primary" onClick={()=> this.setState({...this.state,isReadyToCommit:true})}>OK, COMMIT!</Button>

					</div>
				): (
					<div className="center-text">
						<Typography type="subheading" gutterBottom>
								Sowitt alles suuber bi Dir lokal!
						</Typography>

						<Button raised className={classes.primaryBtn} color="primary" onClick={()=> this.props.complete()}>OK, check Incoming!</Button>
					</div>
				)}


				{sync && sync.outgoing && sync.outgoing.total > 0 &&
				<ExpansionPanel className={classes.panel}>
					<ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
						<Typography className={classes.panelheading}>Scho Ready</Typography>
						<Typography className={classes.panelseconddaryheading}>Änderige wo bereits committed häsch</Typography>

					</ExpansionPanelSummary>
					<ExpansionPanelDetails>
						<LogTable log={sync.outgoing} />
					</ExpansionPanelDetails>
				</ExpansionPanel>
				}
				</section>
			)
		)}
		</div>
	  );
	}
}


const rootComponent = withStyles(styles)<{}>(CommitStep);
export default rootComponent as any as React.StatelessComponent<CommitStepProps>;
