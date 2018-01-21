
import * as React from 'react';

import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import { StyleRulesCallback, WithStyles } from 'material-ui/styles/withStyles';
import Typography from 'material-ui/Typography/Typography';

type withStyleProps = 'root' | 'table' | 'smallCell';


interface StatusTableProps {
	files?: any[],
	hideHeader?: boolean
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


class StatusTable extends React.Component<StatusTableProps & WithStyles<withStyleProps>> {
  state = {
	hideHeader: false
  }
  render() {
    const { files, hideHeader, classes } = this.props;

  	return (
		<div className={classes.root}>

				{(files && files.length > 0 ) ? (
						<div>
							<Table className={classes.table}>
								{ !hideHeader &&
									<TableHead>
										<TableRow>
											<TableCell padding="none">Typ</TableCell>
											<TableCell padding="none">Index</TableCell>
											<TableCell >Path</TableCell>
										</TableRow>
									</TableHead>
								}
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


const rootComponent = withStyles(styles)<{}>(StatusTable);
export default rootComponent as any as React.StatelessComponent<StatusTableProps>;
