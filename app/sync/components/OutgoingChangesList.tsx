
import * as React from 'react';

import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import { StyleRulesCallback, WithStyles } from 'material-ui/styles/withStyles';
import Typography from 'material-ui/Typography/Typography';
import { SyncLogEntry } from '../model';


type withStyleProps = 'root' | 'table' | 'smallCell';


interface OutgoingChangesListProps {
	changes: SyncLogEntry[],
	showHeader?: boolean
};


const styles: StyleRulesCallback<withStyleProps> = (theme) => ({
root: {
    width: '100%',
    overflowX: 'auto',
  } as React.CSSProperties,
  table: {
		minWidth:300
	} as React.CSSProperties,
	smallCell: {
		maxWidth:50
	} as React.CSSProperties,
});


class OutgoingChangesList extends React.Component<OutgoingChangesListProps & WithStyles<withStyleProps>> {
	state = {
		changes: [],
		showHeader: true
	}
  render() {
    const { changes, classes, showHeader } = this.props;

  	return (
		<div className={classes.root}>

				{(changes && changes.length > 0 ) ? (
						<div>
							<Table className={classes.table}>
								{ showHeader &&
									<TableHead>
										<TableRow>
											<TableCell padding="none">Typ</TableCell>
											<TableCell >Message</TableCell>
										</TableRow>
									</TableHead>
								}
								<TableBody>
									{changes.map((n:any) => {
										return (
											<TableRow key={n.path}>
												<TableCell padding="none">{n.type}</TableCell>
												<TableCell title={n.hash}>{n.message}</TableCell>
											</TableRow>
										);
									})}
								</TableBody>

							</Table>
						</div>
				) : (
					<Typography type="title" gutterBottom>
						chillä...
					</Typography>
				)}
		</div>
	);
  }
}


const rootComponent = withStyles(styles)<{}>(OutgoingChangesList);
export default rootComponent as any as React.StatelessComponent<OutgoingChangesListProps>;
