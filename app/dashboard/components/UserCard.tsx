import * as React from 'react';
import { Link } from 'react-router-dom';
import withStyles, { StyleRulesCallback, WithStyles } from 'material-ui/styles/withStyles';
import { User } from '../../users/model';
import Card from 'material-ui/Card/Card';
import CardContent from 'material-ui/Card/CardContent';
import { settingsService } from '../../services/index';
import Button from 'material-ui/Button/Button';
import CardActions from 'material-ui/Card/CardActions';
import Typography from 'material-ui/Typography/Typography';

type withStyleProps = 'card' | 'content';



interface UserCardState {
	root: string;
};

interface UserCardProps {
	user: User
};


const styles: StyleRulesCallback<withStyleProps> = (theme) => ({
	card: {
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
	} as React.CSSProperties,
	content: {
		flexGrow: 1
	} as React.CSSProperties
});


class UserCard extends React.Component<UserCardProps & WithStyles<withStyleProps>, UserCardState> {

	state = {
		root: 'unknown'
	}

	componentWillReceiveProps() {
		this.state.root = settingsService.get('drives.root');
	}

  render() {
    const { classes, user } = this.props;

    return (

		<Card className={classes.card}>
			<CardContent className={classes.content}>
				<Typography type="headline" component="h2">Sali {user.name}!</Typography>
				<Typography component="p">
					<br/>
					<strong>Username:</strong> {user.username}<br/>
					<strong>Branch:</strong> {user.branch}<br/>
					<strong>Root:</strong> {this.state.root}<br/>
					<br/>
				</Typography>
			</CardContent>
			<CardActions>
				<Button dense component={(props:any) => <Link {...props} to="/login" />}>Switch User</Button>
			</CardActions>
		</Card>
    );
  }
}


const rootComponent = withStyles(styles)<{}>(UserCard);
export default rootComponent as any as React.StatelessComponent<UserCardProps>;
