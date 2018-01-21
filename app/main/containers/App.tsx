import { connect, Dispatch } from 'react-redux';
import * as React from 'react';
import { history } from '../../utils';


import Typography from 'material-ui/Typography';
import withStyles, { WithStyles, StyleRulesCallback } from 'material-ui/styles/withStyles';
import withRoot from '../withRoot';

import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import List from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import Hidden from 'material-ui/Hidden';
import Divider from 'material-ui/Divider';
import MenuIcon from 'material-ui-icons/Menu';
import { mailFolderListItems, otherMailFolderListItems, systemFolderListItems } from '../containers/pageData';
import ToolsChecker from '../../tools/ToolsChecker';
import { Tool } from '../../tools/model';

import { updateToolState} from '../../tools';
import { updateStatus, updateIncoming, updateLog, updateOutgoing } from '../../sync';

import { Auth } from '../../auth/model';
import {  getAll } from '../../users/index';
import { Users, User } from '../../users/model';
import { Settings } from '../../settings/model';
import LibrarySync from '../../sync/LibrarySync';
import { Sync } from '../../sync/model';
import LovliDiskModal from '../components/LovliDiskModal';


import { settingsService } from '../../services';
import Avatar from 'material-ui/Avatar/Avatar';
import { libraryService } from '../../sync/library.service';

type withStyleProps = 'root' | 'toolbarLogo' | 'appFrame'| 'appBar'| 'appBarTitle' | 'drawer'| 'drawerBar' | 'navIconHide' | 'drawerHeader' | 'drawerPaper' | 'content';
const drawerWidth = 240;

const styles: StyleRulesCallback<withStyleProps> = (theme) => ({
	root: {
    width: '100%',
    zIndex: 1,
    overflow: 'hidden',
  } as React.CSSProperties,
  appFrame: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%',
	} as React.CSSProperties,

  appBar: {
		position: 'absolute',
		color: '#454545',
		backgroundColor: '#B4D7B2',
    marginLeft: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
	} as React.CSSProperties,

	appBarTitle: {
		flexGrow: 1
	}as React.CSSProperties,
  drawer: {
    height: '100vh'
  } as React.CSSProperties,
  drawerBar: {

		backgroundColor: '#a0bbdb',
		pointerEvents: 'none',
    position: 'absolute',
    marginLeft: 0,
    color: '#eeeeee'
  } as React.CSSProperties,
  navIconHide: {
		color: '#454545',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  } as React.CSSProperties,
  drawerHeader: theme.mixins.toolbar as React.CSSProperties,
  drawerPaper: {
    width: 240,
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      position: 'relative',
      height: '100%',
    },
  } as React.CSSProperties,
  content: {
    [theme.breakpoints.up('md')]: {
      paddingLeft: `${drawerWidth}`,
    },
    backgroundColor: theme.palette.background.default,
    width: '100%',
    padding: theme.spacing.unit * 3,

    height: `calc(100vh - 64px)`,
    overflowY: 'auto',
    marginTop: 56,
    paddingBottom: 56,
    [theme.breakpoints.up('sm')]: {
      marginTop: 64,
      paddingBottom: 64,
    },
	} as React.CSSProperties,


  toolbarLogo: {
		height: 44,
		marginLeft: -18,
		marginRight: 20,
  } as React.CSSProperties
});

type State = {
	mobileOpen: boolean;
	title: string;
	activeUser?: User;
};

const pageTitle:any = {
	"/": "Däshboard",
	"/sync": "Cloud Sünc",
	"/login": "Login",
	"/settings": "Settings",
	"/library": "Library"
}

class App extends React.Component<AppProps & WithStyles<withStyleProps>, State> {
  state = {
		activeUser: undefined,
		mobileOpen: false,
		title: "Lövli..."
  };

  handleClose = () => {
    this.setState({
			...this.state,
      mobileOpen: false,
    });
  };

  handleDrawerToggle = () => {
		this.setState({
			...this.state,mobileOpen: !this.state.mobileOpen });
	};

	componentWillReceiveProps() {
		let title = pageTitle[history.location.pathname];
		if (!title) {
			title = "Lövli..."
		}
		this.state.title = title;


		// TODO use user reducer
		this.setState({ ...this.state, activeUser: settingsService.get('user')});
	}

  componentDidMount() {
		libraryService.getPlaylists().then((snapshot:any) => {
			snapshot.forEach((list:any) => {
				console.log(list.id, '=>', list.data());
			});
		})
		.catch((err:any) => {
			console.log('Error getting documents', err);
		});
		if (!settingsService.get('drives'))  {
			settingsService.set('drives', {root: '/data/lovli'});
		}
    let users = settingsService.get('users') || [] ;
    if (users.length < 1) {
      console.error('no users found!');
		}

		this.props.dispatch(getAll());
  }

  render() {
		const { classes, tools, settings, sync, dispatch } = this.props;
		const activeUser:any = this.state.activeUser;

		const drawer = (
      <div className={classes.drawer}>
        <div className={classes.drawerHeader}>
          <AppBar className={classes.drawerBar}>
            <Toolbar>
							<img src="../resources/icons/lovli-icon-128.png" className={classes.toolbarLogo} />
              <Typography type="title" color="inherit" noWrap>
                Lövli Äpp
              </Typography>
            </Toolbar>
          </AppBar>
        </div>
        <Divider />
        <List>{mailFolderListItems}</List>
        <Divider />
        <List>{otherMailFolderListItems}</List>
        <Divider />
        <List>{systemFolderListItems}</List>
      </div>
    );

			return (
				<div>
					<div>

						<div className={classes.root}>
								<div className={classes.appFrame}>
									<AppBar className={classes.appBar}>
										<Toolbar>
											<IconButton
												color="contrast"
												aria-label="open drawer"
												onClick={this.handleDrawerToggle}
												className={classes.navIconHide}
											>
												<MenuIcon />
											</IconButton>
											<Typography type="title" color="inherit" noWrap className={classes.appBarTitle}>
												{this.state.title}
											</Typography>
											{activeUser && <Avatar alt={activeUser.name} src={activeUser.avatar} />}
										</Toolbar>
									</AppBar>
										<Hidden mdUp>
											<Drawer
												type="temporary"
												anchor='left'
												open={this.state.mobileOpen}
												classes={{
													paper: classes.drawerPaper,
												}}
												onClose={this.handleDrawerToggle}
												ModalProps={{
													keepMounted: true, // Better open performance on mobile.
												}}
											>
												{drawer}
											</Drawer>
										</Hidden>



										<Hidden smDown implementation="css">
											<Drawer
												type="permanent"
												open
												classes={{
													paper: classes.drawerPaper,
												}}
											>
												{drawer}
											</Drawer>
										</Hidden>

									<main className={classes.content}>
										{this.props.children}

									</main>
								</div>
							</div>
							<LibrarySync settings={settings}
									sync={sync}
									status={(s) => dispatch(updateStatus(s))}
									log={(s) => dispatch(updateLog(s))}
									outgoing={(o) => dispatch(updateOutgoing(o))}
									incoming={(i) => dispatch(updateIncoming(i))}/>
							<ToolsChecker tools={tools} settings={settings}
									updateState={(t,s) => dispatch(updateToolState(t, s))}/>

							<LovliDiskModal sync={sync} />
						</div>
				</div>
			);

  }
}

interface AppProps {
	tools: Tool[];
	users: Users;
	auth: Auth;
	settings: Settings;
	sync: Sync;
  dispatch: Dispatch<{}>;
}

const mapStateToProps = (state: any) => ({
	tools: state.tools,
	users: state.users,
	sync: state.sync,
	auth: state.auth,
	settings: state.settings
});





const rootComponent = withRoot(withStyles(styles)<{}>(App));

export default (connect(mapStateToProps)(rootComponent) as any as React.StatelessComponent<{}>);
