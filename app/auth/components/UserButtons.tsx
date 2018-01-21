import * as React from 'react';


import withStyles, { WithStyles, StyleRulesCallback } from 'material-ui/styles/withStyles';
import { Auth } from '../../auth/model';
import ButtonBase from 'material-ui/ButtonBase/ButtonBase';
import Typography from 'material-ui/Typography/Typography';
import { User } from '../../users/model';

interface UserButtonsProps {
	auth: Auth;
	users: User[];
	login: (s: string, p: string)=>void;
};


type withStyleProps = 'root' | 'image' | 'imageButton' | 'imageSrc' | 'imageBackdrop' | 'imageTitle' | 'imageMarked';



const styles: StyleRulesCallback<withStyleProps> = (theme) => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap',
		minWidth: 300,
		width: '100%',
	  } as React.CSSProperties,
	  image: {
		position: 'relative',
		height: 200,
		[theme.breakpoints.down('xs')]: {
		  width: '100% !important', // Overrides inline-style
		  height: 100,
		},
		'&:hover': {
		  zIndex: 1,
		},
		'&:hover $imageBackdrop': {
		  opacity: 0.15,
		},
		'&:hover $imageMarked': {
		  opacity: 0,
		},
		'&:hover $imageTitle': {
		  border: '4px solid currentColor',
		},
	  } as React.CSSProperties,
	  imageButton: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		color: theme.palette.common.white,
	  } as React.CSSProperties,
	  imageSrc: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		backgroundSize: 'cover',
		backgroundPosition: 'center 40%',
	  } as React.CSSProperties,
	  imageBackdrop: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		background: theme.palette.common.black,
		opacity: 0.4,
		transition: theme.transitions.create('opacity'),
	  } as React.CSSProperties,
	  imageTitle: {
			fontSize: '2em',
			position: 'relative',
			padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 4}px ${theme.spacing.unit + 6}px`,
	  } as React.CSSProperties,
	  imageMarked: {
		height: 3,
		width: 18,
		background: theme.palette.common.white,
		position: 'absolute',
		bottom: -2,
		left: 'calc(50% - 9px)',
		transition: theme.transitions.create('opacity'),
	  } as React.CSSProperties,
});

class UserButtons extends React.Component<UserButtonsProps & WithStyles<withStyleProps>> {

	selectUser(username: string, pw: string) {
		this.props.login(username, pw);
	}


  render() {
	const { classes, users } = this.props;


    return (
      <div className={classes.root}>

          {users && users.length > 0 ? (
						users.map((user:any) => (
							<ButtonBase
								onClick={() => this.selectUser(user.username, user.password)}
								focusRipple
								key={user.id}
								className={classes.image}
								style={{
									width: '30%',
								}}
							>
								<div
									className={classes.imageSrc}
									style={{
										backgroundImage: `url(${user.avatar})`,
									}}
								/>
								<div className={classes.imageBackdrop} />
								<div className={classes.imageButton}>
									<Typography
										component="h3"
										type="subheading"
										color="inherit"
										className={classes.imageTitle}
									>
										{user.name}
										<div className={classes.imageMarked} />
									</Typography>
								</div>
							</ButtonBase>
						))
					) : (
						<Typography>Loading...</Typography>
					)}

    </div>
    );
  }

}

const rootComponent = withStyles(styles)<{}>(UserButtons);
export default rootComponent as any as React.StatelessComponent<UserButtonsProps>;
