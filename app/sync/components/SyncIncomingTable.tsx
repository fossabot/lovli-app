
import * as React from 'react';

import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import { StyleRulesCallback, WithStyles } from 'material-ui/styles/withStyles';
import Typography from 'material-ui/Typography/Typography';

type withStyleProps = 'root' | 'table' | 'smallCell';


interface SyncIncomingTableProps {
	files?: any[]
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


class SyncIncomingTable extends React.Component<SyncIncomingTableProps & WithStyles<withStyleProps>> {

  render() {
    const { files, classes } = this.props;

  	return (
		<div className={classes.root}>

				{(files && files.length > 0 ) ? (
						<div>
							<Table className={classes.table}>
								<TableHead>
									<TableRow>
										<TableCell padding="none">File</TableCell>
										<TableCell padding="none">Changes</TableCell>
										<TableCell padding="none">Insertions</TableCell>
										<TableCell >Deletions</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{files.map((k:number,n:any) => {
										return (
											<TableRow key={k}>
												<TableCell padding="none">{n.file}</TableCell>
												<TableCell padding="none">{n.changes}</TableCell>
												<TableCell padding="none">{n.insertions}</TableCell>
												<TableCell >{n.deletions}</TableCell>
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


const rootComponent = withStyles(styles)<{}>(SyncIncomingTable);
export default rootComponent as any as React.StatelessComponent<SyncIncomingTableProps>;
