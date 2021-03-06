import * as React from 'react';
import { Redirect } from 'react-router-dom'
import axios from 'axios';
import Button from '@mui/material/Button';
import { styled, useTheme } from '@mui/material/styles';
import { makeStyles } from "@material-ui/core/styles";
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import useMediaQuery from '@mui/material/useMediaQuery';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Logout from '@mui/icons-material/Logout';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AssignmentIcon from '@mui/icons-material/Assignment';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import LayersIcon from '@mui/icons-material/Layers';
import ListSubheader from '@mui/material/ListSubheader';

import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

import theme from '../theme'
import { mainListItems } from '../ui-components/listItems'
import { Stack } from '@mui/material';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const useStyles = makeStyles(theme => ({
    root: {
      boxShadow: "none",
      backgroundColor: "#5090D3",
      color: "#ffffff"
    } 
  }));

export default function PersistentDrawerLeft(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const menuopen = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const classes = useStyles();
  const theme = useTheme();
  const midScreen = useMediaQuery(theme.breakpoints.up('sm'));
  const [value, setValue] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [projectData, setProjectData] = React.useState([]);
  const name = (JSON.parse(localStorage.getItem("userData")).fullname).slice(0,1);
  const display_picture = JSON.parse(localStorage.getItem("userData")).display_picture;

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  function logout(e){
    e.preventDefault();
    localStorage.clear();
    axios.get('http://127.0.0.1:8000/logout',{withCredentials: true}).then(resp => {
    console.log('Response', resp);
    window.location = "/";
    });
}

  async function ProjectData() {
        axios.defaults.withCredentials = true;
        axios
            .get('http://127.0.0.1:8000/userproject/', { withCredentials:true })
            .then((response) => {
                if(response.status == 200)
                    {const sorted = [...response.data].sort((a, b) => b['id'] - a['id']);
                    setProjectData(sorted)
                        
                }
            })
            .catch((error) => console.log(error));
        }
        
        React.useEffect(()=>{
            ProjectData();
            console.log(props)
        }, []);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} className={classes.root}>
        <Toolbar>
          {midScreen && <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: '36px',
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>}
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}> 
            WorkDesk
          </Typography>
            <IconButton color="inherit"
            id="basic-button" 
            aria-controls="basic-menu"
            aria-haspopup="true"
            aria-expanded={menuopen ? 'true' : undefined}
            onClick={handleClick}>
            {(display_picture!=null)?
            (<Avatar src={`http://channeli.in${display_picture}`}/>):
            (<Avatar>{name}</Avatar>)}
            </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={menuopen}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={logout}> <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      {midScreen && 
      <Drawer variant="permanent" open={open} >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          { mainListItems }
        </List>
        <Divider />
        <List>
          <ListSubheader inset>My Projects</ListSubheader>
          {projectData && projectData.map(item => {
            return(
             <ListItem button component={Link} to={'/'+item.id}>
             <ListItemIcon>
               <AssignmentIcon />
             </ListItemIcon>
             <ListItemText primary={item.title} />
           </ListItem>
          )})}
        </List>
      </Drawer>}
      {!midScreen &&
      <Box position="fixed" sx={{top: 'auto', bottom:0, zIndex:1000, width:'100%'}}>
      <BottomNavigation
      showLabels
      value={props.value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}>
      <BottomNavigationAction label="Dashboard" icon={<DashboardIcon />} component={Link} to="/dashboard"/>
      <BottomNavigationAction label="Projects" icon={<LayersIcon />} component={Link} to="/home"/>
      <BottomNavigationAction label="Users" icon={<PeopleIcon />} component={Link} to="/users"/>
    </BottomNavigation>
      </Box>
      }
      <Box component="main" sx={{
            backgroundColor: (theme) => theme.palette.background.default,
            p: 3,
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}>
        <DrawerHeader />
        {props.children}
      </Box>
    </Box>
  );
}
