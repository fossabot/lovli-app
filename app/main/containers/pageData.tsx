// This file is shared across the demos.

import * as React from 'react';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import DashboardIcon from 'material-ui-icons/Dashboard';
import WorkIcon from 'material-ui-icons/Work';
import CloudCircleIcon from 'material-ui-icons/CloudCircle';
import LibraryMusicIcon from 'material-ui-icons/LibraryMusic';
import MailIcon from 'material-ui-icons/Mail';
import SettingsIcon from 'material-ui-icons/Settings';
import HelpIcon from 'material-ui-icons/Help';
import PowerSettingsNewIcon from 'material-ui-icons/PowerSettingsNew';

import { Link } from 'react-router-dom';


export const mailFolderListItems = (
  <div>
    <ListItem button component={(props:any) => <Link {...props} to="/" />} >
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Home" />
    </ListItem>
    <ListItem button component={(props:any) => <Link {...props} to="/sync" />} >
      <ListItemIcon>
        <CloudCircleIcon />
      </ListItemIcon>
      <ListItemText primary="Sync" />
    </ListItem>
    <ListItem button component={(props:any) => <Link {...props} to="/library" />} >
      <ListItemIcon>
        <LibraryMusicIcon />
      </ListItemIcon>
      <ListItemText primary="Libary" />
    </ListItem>

  </div>
);

export const otherMailFolderListItems = (
  <div>
    <ListItem button component={(props:any) => <Link {...props} to="/setup" />} >
      <ListItemIcon>
        <WorkIcon />
      </ListItemIcon>
      <ListItemText primary="Archive" />
    </ListItem>
    <ListItem button component={(props:any) => <Link {...props} to="/advancedlogin" />} >
      <ListItemIcon>
        <MailIcon />
      </ListItemIcon>
      <ListItemText primary="Messages" />
    </ListItem>
  </div>
);

export const systemFolderListItems = (
  <div>
    <ListItem button component={(props:any) => <Link {...props} to="/settings" />} >
      <ListItemIcon>
        <SettingsIcon />
      </ListItemIcon>
      <ListItemText primary="Settings" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <HelpIcon />
      </ListItemIcon>
      <ListItemText primary="Help" />
    </ListItem>
    <ListItem button component={(props:any) => <Link {...props} to="/login" />} >
      <ListItemIcon>
        <PowerSettingsNewIcon />
      </ListItemIcon>
      <ListItemText primary="Logout" />
    </ListItem>
  </div>
);
