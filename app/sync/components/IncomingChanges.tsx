



import * as React from 'react';


import ExpandMoreIcon from 'material-ui-icons/ExpandMore';

import { withStyles } from 'material-ui/styles';
import { StyleRulesCallback, WithStyles } from 'material-ui/styles/withStyles';
import { Sync } from '../model';
import Typography from 'material-ui/Typography/Typography';

import ExpansionPanel from 'material-ui/ExpansionPanel/ExpansionPanel';
import ExpansionPanelSummary from 'material-ui/ExpansionPanel/ExpansionPanelSummary';
import ExpansionPanelDetails from 'material-ui/ExpansionPanel/ExpansionPanelDetails';
import { LovliRed, LovliBlue, LovliGreen } from '../../utils/colors';
import SyncIncomingTable from './SyncIncomingTable';

type withStyleProps = 'root' | 'heading' | 'secondaryHeading' | 'edit'  | 'badge' | 'remove'  | 'new';



interface IncomingChangesState {
	expanded?: string;
};

interface IncomingChangesProps {
	sync: Sync
};


const styles: StyleRulesCallback<withStyleProps> = (theme) => ({
	root: {
		width: '100%',
	  } as React.CSSProperties,
	  badge: {
		margin: `0 ${theme.spacing.unit * 2}px`,
	  } as React.CSSProperties,
	  edit: {
		backgroundColor: LovliBlue.A400
	  } as React.CSSProperties,
	  new: {
		backgroundColor: LovliGreen.A400
	  } as React.CSSProperties,
	  remove: {
		backgroundColor: LovliRed.A400
	  } as React.CSSProperties,
	  heading: {
		fontSize: theme.typography.pxToRem(15),
		flexGrow: 1,
		flexShrink: 0,
		lineHeight: theme.typography.pxToRem(40),
	  } as React.CSSProperties,
	  secondaryHeading: {
		fontSize: theme.typography.pxToRem(15),
		lineHeight: theme.typography.pxToRem(40),
		marginRight: theme.spacing.unit * 2,
		marginLeft: theme.spacing.unit,
	  } as React.CSSProperties,
});


class IncomingChanges extends React.Component<IncomingChangesProps & WithStyles<withStyleProps>, IncomingChangesState> {
	state = {
		expanded: 'panel1',
	};

	handleChange(panel:string) {
		this.setState({
			expanded: this.state.expanded !== panel ? panel : undefined,
		});
	};

	render() {
	const { classes, sync } = this.props;
	const { expanded } = this.state;
	//const modified = sync.incoming.insertions;
	//const deleted = sync.incoming.deletions;
	return (
		<div className={classes.root}>
		<ExpansionPanel expanded={expanded === 'panel1'} onChange={()=>this.handleChange('panel1')}>
			<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
				<Typography className={classes.heading}>Collection</Typography>

				<div className={classes.secondaryHeading}>
					...
				</div>
			</ExpansionPanelSummary>
			<ExpansionPanelDetails>
			{(sync.incoming && sync.incoming.all && sync.incoming.all) ? (
				<SyncIncomingTable files={sync.incoming.all} />
			) : (
				<Typography>Kei Änderige gfunde.</Typography>
			)}
			</ExpansionPanelDetails>
		</ExpansionPanel>
		<ExpansionPanel expanded={expanded === 'panel2'} onChange={()=>this.handleChange('panel2')}>
			<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
			<Typography className={classes.heading}>Playlists</Typography>

			<div className={classes.secondaryHeading}>
				...
			</div>
			</ExpansionPanelSummary>
			<ExpansionPanelDetails>
			{(sync.incoming && sync.incoming.all && sync.incoming.all) ? (
				<SyncIncomingTable files={sync.incoming.all} />
			) : (
				<Typography>Kei Änderige gfunde.</Typography>
			)}
			</ExpansionPanelDetails>
		</ExpansionPanel>
		<ExpansionPanel expanded={expanded === 'panel3'} onChange={()=>this.handleChange('panel3')}>
			<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
			<Typography className={classes.heading}>Files</Typography>

			<div className={classes.secondaryHeading}>
				...
			</div>

			</ExpansionPanelSummary>
			<ExpansionPanelDetails>
				{(sync.incoming && sync.incoming.all && sync.incoming.all) ? (
					<SyncIncomingTable files={sync.incoming.all} />
				) : (
					<Typography>Kei Änderige gfunde.</Typography>
				)}
			</ExpansionPanelDetails>
		</ExpansionPanel>
		</div>
	);
	}
}


const rootComponent = withStyles(styles)<{}>(IncomingChanges);
export default rootComponent as any as React.StatelessComponent<IncomingChangesProps>;
