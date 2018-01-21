



import * as React from 'react';


import ExpandMoreIcon from 'material-ui-icons/ExpandMore';

import { withStyles } from 'material-ui/styles';
import { StyleRulesCallback, WithStyles } from 'material-ui/styles/withStyles';
import { Sync } from '../model';
import Typography from 'material-ui/Typography/Typography';

import ExpansionPanel from 'material-ui/ExpansionPanel/ExpansionPanel';
import ExpansionPanelSummary from 'material-ui/ExpansionPanel/ExpansionPanelSummary';
import ExpansionPanelDetails from 'material-ui/ExpansionPanel/ExpansionPanelDetails';
import Badge from 'material-ui/Badge/Badge';
import FiberNewIcon from 'material-ui-icons/FiberNew';
import ModeEditIcon from 'material-ui-icons/Edit';
import RemoveCircleIcon from 'material-ui-icons/RemoveCircle';
import { LovliRed, LovliBlue, LovliGreen } from '../../utils/colors';
import SyncStatusTable from './SyncStatusTable';
import SyncCollectionTable from './SyncCollectionTable';

type withStyleProps = 'root' | 'heading' | 'secondaryHeading' | 'edit'  | 'badge' | 'remove'  | 'new';



interface MyChangesState {
	expanded?: string;
};

interface MyChangesProps {
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


class MyChanges extends React.Component<MyChangesProps & WithStyles<withStyleProps>, MyChangesState> {
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
	const created = sync.status.created ? sync.status.created.length : 0;
	const modified = sync.status.modified ? sync.status.modified.length : 0;
	const deleted = sync.status.deleted ? sync.status.deleted.length : 0;
	return (
		<div className={classes.root}>
		<ExpansionPanel expanded={expanded === 'panel1'} onChange={()=>this.handleChange('panel1')}>
			<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
				<Typography className={classes.heading}>Collection</Typography>

				<div className={classes.secondaryHeading}>
					<Badge  classes={{root: classes.badge, badge: classes.new}}  badgeContent={created} color="primary"><FiberNewIcon /></Badge>
					<Badge  classes={{root: classes.badge, badge: classes.edit}}  badgeContent={modified} color="primary"><ModeEditIcon /></Badge>
					<Badge classes={{root: classes.badge, badge: classes.remove}} badgeContent={deleted}><RemoveCircleIcon /></Badge>
				</div>
			</ExpansionPanelSummary>
			<ExpansionPanelDetails>
			{(sync.status && sync.status.files && sync.status.files) ? (
				<SyncCollectionTable files={sync.status.files} />
			) : (
				<Typography>Kei Änderige gfunde.</Typography>
			)}
			</ExpansionPanelDetails>
		</ExpansionPanel>
		<ExpansionPanel expanded={expanded === 'panel2'} onChange={()=>this.handleChange('panel2')}>
			<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
			<Typography className={classes.heading}>Playlists</Typography>

			<div className={classes.secondaryHeading}>
				<Badge  classes={{root: classes.badge, badge: classes.new}}  badgeContent={created} color="primary"><FiberNewIcon /></Badge>
				<Badge  classes={{root: classes.badge, badge: classes.edit}}  badgeContent={modified} color="primary"><ModeEditIcon /></Badge>
				<Badge classes={{root: classes.badge, badge: classes.remove}} badgeContent={deleted}><RemoveCircleIcon /></Badge>
			</div>
			</ExpansionPanelSummary>
			<ExpansionPanelDetails>
			{(sync.status && sync.status.files && sync.status.files) ? (
				<SyncStatusTable files={sync.status.files} />
			) : (
				<Typography>Kei Änderige gfunde.</Typography>
			)}
			</ExpansionPanelDetails>
		</ExpansionPanel>
		<ExpansionPanel expanded={expanded === 'panel3'} onChange={()=>this.handleChange('panel3')}>
			<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
			<Typography className={classes.heading}>Files</Typography>

			<div className={classes.secondaryHeading}>
				<Badge  classes={{root: classes.badge, badge: classes.new}}  badgeContent={created} color="primary"><FiberNewIcon /></Badge>
				<Badge  classes={{root: classes.badge, badge: classes.edit}}  badgeContent={modified} color="primary"><ModeEditIcon /></Badge>
				<Badge classes={{root: classes.badge, badge: classes.remove}} badgeContent={deleted}><RemoveCircleIcon /></Badge>
			</div>

			</ExpansionPanelSummary>
			<ExpansionPanelDetails>
				{(sync.status && sync.status.files && sync.status.files) ? (
					<SyncStatusTable files={sync.status.files} />
				) : (
					<Typography>Kei Änderige gfunde.</Typography>
				)}
			</ExpansionPanelDetails>
		</ExpansionPanel>
		</div>
	);
	}
}


const rootComponent = withStyles(styles)<{}>(MyChanges);
export default rootComponent as any as React.StatelessComponent<MyChangesProps>;
