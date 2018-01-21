
import * as React from 'react';

import { withStyles } from 'material-ui/styles';

import { StyleRulesCallback, WithStyles } from 'material-ui/styles/withStyles';
import { Sync } from '../model';
import LogTable from './LogTable';


type withStyleProps = 'root' | 'table';


interface SyncHistorySectionProps {
	sync: Sync
};


const styles: StyleRulesCallback<withStyleProps> = (theme) => ({
	root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  } as React.CSSProperties,
  table: {
    minWidth: 700,
  } as React.CSSProperties,
});


class SyncHistorySection extends React.Component<SyncHistorySectionProps & WithStyles<withStyleProps>> {


  render() {
    const { classes, sync } = this.props;

  return (
    <div className={classes.root}>
		<LogTable log={sync.log} />
    </div>
  );
  }
}


const rootComponent = withStyles(styles)<{}>(SyncHistorySection);
export default rootComponent as any as React.StatelessComponent<SyncHistorySectionProps>;
