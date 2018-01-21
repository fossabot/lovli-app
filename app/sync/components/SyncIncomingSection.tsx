
import * as React from 'react';

import { withStyles } from 'material-ui/styles';
import { StyleRulesCallback, WithStyles } from 'material-ui/styles/withStyles';
import { Sync } from '../model';
import Typography from 'material-ui/Typography/Typography';
import IncomingChanges from './IncomingChanges';

type withStyleProps = 'root' | 'table' | 'smallCell';


interface SyncIncomingSectionProps {
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
	smallCell: {
		maxWidth:50
	} as React.CSSProperties,
});


class SyncIncomingSection extends React.Component<SyncIncomingSectionProps & WithStyles<withStyleProps>> {

	render() {
		const { sync, classes } = this.props;

	  return (
		<div className={classes.root}>
		{(sync && sync.incoming && (sync.incoming.total > 0)) ? (
					<IncomingChanges sync={sync} />
			) : (
				<Typography type="title" gutterBottom className="center-text">
					Kei lokali Änderige bis etzt
				</Typography>

			)}
		</div>
	  );
	}
}


const rootComponent = withStyles(styles)<{}>(SyncIncomingSection);
export default rootComponent as any as React.StatelessComponent<SyncIncomingSectionProps>;
