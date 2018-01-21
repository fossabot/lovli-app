
import * as React from 'react';

import { withStyles } from 'material-ui/styles';
import { StyleRulesCallback, WithStyles } from 'material-ui/styles/withStyles';
import { Sync } from '../model';
import Typography from 'material-ui/Typography/Typography';

import SyncStatusTable from './SyncStatusTable';
import LogTable from './LogTable';

type withStyleProps = 'root' | 'table' | 'section';


interface SyncChangesSectionProps {
	sync: Sync
};


const styles: StyleRulesCallback<withStyleProps> = (theme) => ({
	root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  } as React.CSSProperties,
  table: {
		minWidth:300
	} as React.CSSProperties,
	section: {
		padding: theme.spacing.unit * 3,
	} as React.CSSProperties,
});


class SyncChangesSection extends React.Component<SyncChangesSectionProps & WithStyles<withStyleProps>> {

  render() {
    const { sync, classes } = this.props;

  return (
    <div className={classes.root}>
		<section  className={classes.section}>
			<Typography type="subheading" gutterBottom>Session</Typography>
			<Typography type="caption">
				Änerige wo nanig committed häsch.
			</Typography>
			{(sync && sync.status && sync.status.files && sync.status.files.length > 0) ? (

				<SyncStatusTable files={sync.status.files} />
				//<MyChanges sync={sync} />
		) : (
			<Typography className="center-test">
				Alles clean!
			</Typography>

				)}
		</section>
		<section  className={classes.section}>
			<Typography type="subheading" gutterBottom>Commits</Typography>
			<Typography type="caption">
					Änderige wo committed aber nanig mit de Lövli Cloud synchronisiert sind.
				</Typography>
			{(sync && sync.outgoing && sync.outgoing.total > 0) ? (

		<LogTable log={sync.outgoing}/>
			//<MyChanges sync={sync} />
			) : (
			<Typography  className="center-tesxt">
				NSync
			</Typography>

			)}
		</section>
    </div>
  );
  }
}


const rootComponent = withStyles(styles)<{}>(SyncChangesSection);
export default rootComponent as any as React.StatelessComponent<SyncChangesSectionProps>;
