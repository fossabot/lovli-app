import * as React from 'react';
import { Link } from 'react-router-dom';
import withStyles, { StyleRulesCallback, WithStyles } from 'material-ui/styles/withStyles';
import Card from 'material-ui/Card/Card';
import CardContent from 'material-ui/Card/CardContent';
import { settingsService } from '../../services/index';
import Button from 'material-ui/Button/Button';
import CardActions from 'material-ui/Card/CardActions';
import Typography from 'material-ui/Typography/Typography';
import { Sync } from '../../sync/model';
import LogTable from '../../sync/components/LogTable';

type withStyleProps = 'card' | 'content' | 'subheading' | 'dialogBtn';



interface SyncOverviewCardState {
	root: string;
};

interface SyncOverviewCardProps {
	sync: Sync
};


const styles: StyleRulesCallback<withStyleProps> = (theme) => ({
	card: {
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
	} as React.CSSProperties,
	content: {
		flexGrow: 1
	} as React.CSSProperties,
	subheading: {
		marginTop: 16
	} as React.CSSProperties,
	dialogBtn: {
		color: "#eeeeee"
	} as React.CSSProperties,
});


class SyncOverviewCard extends React.Component<SyncOverviewCardProps & WithStyles<withStyleProps>, SyncOverviewCardState> {

	state = {
		root: 'unknown'
	}

	componentWillReceiveProps() {
		this.state.root = settingsService.get('drives.root');
	}

	handleOpenSyncDialog = () => {

	};
  render() {
    const { classes, sync } = this.props;

    return (

		<Card className={classes.card}>
			<CardContent className={classes.content}>
				<Typography type="headline" component="h2">Sünc</Typography>

				<Typography component="h3" type="subheading" color="inherit" className={classes.subheading}>
					Outgoing
				</Typography>
			<LogTable log={sync.outgoing} latest show-header="false" />

				<Typography component="h3" type="subheading" color="inherit" className={classes.subheading}>
					Incoming
				</Typography>
				<LogTable log={sync.incoming} latest show-header="false" />
			</CardContent>
			<CardActions>
				<Button raised color="primary" className={classes.dialogBtn} onClick={this.handleOpenSyncDialog}>Sync Now!</Button>
				<Button dense component={(props:any) => <Link {...props} to="/sync" />}>More</Button>
			</CardActions>
		</Card>
    );
  }
}


const rootComponent = withStyles(styles)<{}>(SyncOverviewCard);
export default rootComponent as any as React.StatelessComponent<SyncOverviewCardProps>;
