
import * as React from 'react';

import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import { StyleRulesCallback, WithStyles } from 'material-ui/styles/withStyles';
import Typography from 'material-ui/Typography/Typography';
import { SyncLog } from '../model';
import { FormattedDate } from 'react-intl'
import Avatar from 'material-ui/Avatar/Avatar';

type withStyleProps = 'root' | 'table' | 'dateCell' | 'avatarCell' | 'msg' | 'avatar';


interface LogTableProps {
	log: SyncLog;
	showHeader?: boolean;
	loading?: boolean;
	latest?: boolean;
	hideAuthor?: boolean;
};


const styles: StyleRulesCallback<withStyleProps> = (theme) => ({
	root: {
    	width: '100%',
    	overflowX: 'auto',
  	} as React.CSSProperties,

	table: {
		minWidth:300
	} as React.CSSProperties,

	msg: {
		maxWidth: 100,
		paddingRight: 4,
		textOverflow: 'ellipsis',
		whiteSpace: 'nowrap',
		overflow: 'hidden'
	} as React.CSSProperties,

	avatar: {
		height: 24,
		width: 24,
		fontSize: "0.75em",
		margin: '0 auto'
	} as React.CSSProperties,

	avatarCell: {
		width: 50,
		textAlign: 'center'
	} as React.CSSProperties,

	dateCell: {
		width: 50,
		textOverflow: 'ellipsis',
		whiteSpace: 'nowrap',
		overflow: 'hidden'
	} as React.CSSProperties,
});


class LogTable extends React.Component<LogTableProps & WithStyles<withStyleProps>> {

state = {
	latest: false,
}

  _authorInitials(name:string) {
	  return name? name.charAt(0) : '?';
  }

  render() {
    const { log,latest, classes } = this.props;

  	return (
		<div className={classes.root}>

				{(log && !log.loading) ? (
					 (log.total > 0 ) ? (
						<div>
							<Table className={classes.table}>
								<TableHead>
									<TableRow>
										<TableCell padding="none" className={classes.msg}>Message</TableCell>
										<TableCell padding="none" className={classes.avatarCell}>Author</TableCell>
										<TableCell padding="none" className={classes.dateCell}>Date</TableCell>

									</TableRow>
								</TableHead>

								<TableBody>
									{ latest ? (
										log.latest ? (
										<TableRow key={log.latest.hash}>
											<TableCell padding="none" title={log.latest.hash} className={classes.msg}>{log.latest.message}</TableCell>
											<TableCell padding="none" className={classes.avatarCell}>
												<Avatar component="span" className={classes.avatar}>{this._authorInitials(log.latest.author_name)}</Avatar>
											</TableCell>
											<TableCell padding="none"  className={classes.dateCell}><FormattedDate value={log.latest.date} /></TableCell>

										</TableRow>) : (

										<Typography type="title" gutterBottom>
											leider nein...
										</Typography>
										)

									) : log.all.map((n:any) => {
										return (
											<TableRow key={n.hash}>
												<TableCell padding="none" title={n.hash} className={classes.msg}>{n.message}</TableCell>
												<TableCell padding="none" className={classes.avatarCell}>
													<Avatar component="span" className={classes.avatar}>{this._authorInitials(n.author_name)}</Avatar>
												</TableCell>
												<TableCell padding="none"  className={classes.dateCell}><FormattedDate value={n.date} /></TableCell>
											</TableRow>
										);

									})}
								</TableBody>

							</Table>
						</div>
					) : (
						<Typography type="caption" gutterBottom>
							so fresh and so clean!
						</Typography>
					)
				) : (
					<Typography type="title" gutterBottom>
						loading...
					</Typography>
				)}
		</div>
	);
  }
}


const rootComponent = withStyles(styles)<{}>(LogTable);
export default rootComponent as any as React.StatelessComponent<LogTableProps>;
