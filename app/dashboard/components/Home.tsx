import * as React from 'react';
import Grid from 'material-ui/Grid/Grid';
import withStyles, { StyleRulesCallback, WithStyles } from 'material-ui/styles/withStyles';
import { Users } from '../../users/model';
import { settingsService } from '../../services/index';
import UserCard from './UserCard';
import LibraryChartCard from './LibraryChartCard';
import SyncOverviewCard from './SyncOverviewCard';
import { Sync } from '../../sync/model';

const data = [
      {name: '2015', tracks: 250, artists: 20, playlists: 6},
      {name: '2016', tracks: 800, artists: 90, playlists: 25},
      {name: '2017', tracks: 1205, artists: 230, playlists: 16},
      {name: '2018', tracks: 2780, artists: 524, playlists: 29},
];
//let styles = require('./Home.scss');

type withStyleProps = 'root' | 'details' | 'content' | 'cover' | 'controls';



interface HomeState {
	root: string;
};

interface HomeProps {
	users: Users,
	sync: Sync
};


const styles: StyleRulesCallback<withStyleProps> = (theme) => ({
	root: {
		flexGrow: 1,
	  } as React.CSSProperties,

		details: {
			display: 'flex',
			flexDirection: 'column',
		} as React.CSSProperties,
		content: {
			flex: '1 0 auto',
		} as React.CSSProperties,
		cover: {
			width: 151,
			height: 151,
		} as React.CSSProperties,
		controls: {
			display: 'flex',
			alignItems: 'center',
			paddingLeft: theme.spacing.unit,
			paddingBottom: theme.spacing.unit,
		} as React.CSSProperties,

});


class Home extends React.Component<HomeProps & WithStyles<withStyleProps>, HomeState> {

  render() {
		const { classes, sync } = this.props;

		// TODO: get from app state
		const user = settingsService.get('user');

    return (
      <div>
				<Grid container className={classes.root} justify="center" spacing={(16)}>
					<Grid key="sync" item  xs={12} sm={6}>
						<SyncOverviewCard sync={sync} />
					</Grid>
					<Grid key="users" item  xs={12} sm={6}>
						<UserCard user={user} />
					</Grid>
					<Grid key="lib" item  xs={12} sm={12}>
						<LibraryChartCard data={data} />
					</Grid>
				</Grid>
      </div>
    );
  }
}


const rootComponent = withStyles(styles)<{}>(Home);
export default rootComponent as any as React.StatelessComponent<HomeProps>;
