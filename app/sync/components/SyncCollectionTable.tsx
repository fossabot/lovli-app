
import * as React from 'react';

import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import { StyleRulesCallback, WithStyles } from 'material-ui/styles/withStyles';
import Typography from 'material-ui/Typography/Typography';

type withStyleProps = 'root' | 'table' | 'smallCell';


interface SyncCollectionTableProps {
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


class SyncCollectionTable extends React.Component<SyncCollectionTableProps & WithStyles<withStyleProps>> {

  render() {
    const { files, classes } = this.props;

  	return (
		<div className={classes.root}>

				{(files && files.length > 0 ) ? (
						<div>
							<Table className={classes.table}>
								<TableHead>
									<TableRow>
										<TableCell padding="none">Typ</TableCell>
										<TableCell padding="none">Index</TableCell>
										<TableCell >Path</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{files.map((n:any) => {
										return (
											<TableRow key={n.path}>
												<TableCell padding="none">{n.working_dir}</TableCell>
												<TableCell padding="none">{n.index}</TableCell>
												<TableCell >{n.path}</TableCell>
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


const rootComponent = withStyles(styles)<{}>(SyncCollectionTable);
export default rootComponent as any as React.StatelessComponent<SyncCollectionTableProps>;
