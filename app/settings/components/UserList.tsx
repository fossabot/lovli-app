import * as React from 'react';
import List, {
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from 'material-ui/List';

import withStyles, { WithStyles, StyleRulesCallback } from 'material-ui/styles/withStyles';
import { Users, User } from '../../users/model';
import CircularProgress from 'material-ui/Progress/CircularProgress';

interface UserListProps {
	users: Users;
};

type withStyleProps = 'root' | 'avatar';

const styles: StyleRulesCallback<withStyleProps> = (theme) => ({

	root: {
		width: '100%',
		backgroundColor: theme.palette.background.paper,
	} as React.CSSProperties,

	avatar: {
		height: '48px',
		width: '48px',
	} as React.CSSProperties,
});

class UserList extends React.Component<UserListProps & WithStyles<withStyleProps>> {


  render() {
	const { users, classes } = this.props;
    return (
		<div className={classes.root}>

					{(users.loading) ? (
						<div>
							<CircularProgress />
							<em>loading lovli users...</em>
						</div>

					) : (
						users.users &&
							<List subheader={<ListSubheader>Users</ListSubheader>}>

							{ users && users.users && users.users.map((user: User, id: number) => {

								return (
									<ListItem key={user.id}>
										<ListItemIcon>
											<img src="../resources/avatars/lovli-avatar-1.png" className={classes.avatar} />
										</ListItemIcon>
										<ListItemText primary={ user.name } secondary={user.username} />
									</ListItem>
								)
						})}
						</List>
					) }

					{users.error && <span className="text-danger">Fähler: {users.error}</span>}

      </div>
    );
  }

}

const rootComponent = withStyles(styles)<{}>(UserList);
export default rootComponent as any as React.StatelessComponent<UserListProps>;
