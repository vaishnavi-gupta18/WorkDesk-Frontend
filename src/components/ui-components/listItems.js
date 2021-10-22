import * as React from 'react';
import Tooltip from '@mui/material/Tooltip';
import ListItem from '@mui/material/ListItem';
import { Link } from 'react-router-dom';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import LayersIcon from '@mui/icons-material/Layers';
import useMediaQuery from '@mui/material/useMediaQuery';

import theme from '../theme'

export const mainListItems = (
  // <div className='nav-items'>
  <React.Fragment>
    <ListItem button component={Link} to="/dashboard">
      <Tooltip title="Dashboard">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      </Tooltip>
      <ListItemText primary="Dashboard" />
    </ListItem>
    <ListItem button component={Link} to="/home">
    <Tooltip title="Projects">
      <ListItemIcon>
      <LayersIcon />
      </ListItemIcon>
    </Tooltip>
      <ListItemText primary="Projects" />
    </ListItem>
    <ListItem button component={Link} to="/users">
    <Tooltip title="Users">
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
    </Tooltip>
      <ListItemText primary="Users" />
    </ListItem>
    </React.Fragment>
  // </div>
);
