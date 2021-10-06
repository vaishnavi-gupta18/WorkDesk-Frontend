import * as React from 'react';
import Box from '@mui/material/Box';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import ArrowRight from '@mui/icons-material/ArrowRight';
import LayersIcon from '@mui/icons-material/Layers';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import Home from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import Settings from '@mui/icons-material/Settings';
import People from '@mui/icons-material/People';
import PermMedia from '@mui/icons-material/PermMedia';
import Dns from '@mui/icons-material/Dns';
import axios from 'axios';
import ReactHtmlParser from 'react-html-parser';
import Public from '@mui/icons-material/Public';
import ProjectItem from './projectitem'

const data = [
  { icon: <People />, label: 'Authentication' },
  { icon: <Dns />, label: 'Database' },
  { icon: <PermMedia />, label: 'Storage' },
  { icon: <Public />, label: 'Hosting' },
];

const FireNav = styled(List)({
  '& .MuiListItemButton-root': {
    paddingLeft: 24,
    paddingRight: 24,
  },
  '& .MuiListItemIcon-root': {
    minWidth: 0,
    marginRight: 16,
  },
  '& .MuiSvgIcon-root': {
    fontSize: 20,
  },
});

export default function CustomizedList(props) {

  return (
    <Box sx={{ display: 'flex' }}>
      <ThemeProvider
        theme={createTheme({
          components: {
            MuiListItemButton: {
              defaultProps: {
                disableTouchRipple: true,
              },
            },
          },
          palette: {
            mode: 'dark',
            primary: { main: 'rgb(102, 157, 246)' },
            background: { paper: 'rgb(5, 30, 52)' },
          },
        })}
      >
        <Paper elevation={0} sx={{ maxWidth: '100%'}}>
          <FireNav component="nav" disablePadding>
          <ListItem component="div" disablePadding>
            <ListItemButton>
              <ListItemIcon sx={{ fontSize: 20 }}><LayersIcon /></ListItemIcon>
              <ListItemText
                sx={{ my: 0 }}
                primary="My Projects"
                primaryTypographyProps={{
                  fontSize: 20,
                  fontWeight: 'medium',
                  letterSpacing: 0,
                }}
              />
               <Divider/>
            </ListItemButton>
            <Tooltip title="Add Project">
                <IconButton
                  size="large"
                  sx={{
                    '& svg': {
                      color: 'rgba(255,255,255,0.8)',
                      transition: '0.2s',
                      transform: 'translateX(0) rotate(0)',
                    }
                }}
                >
                  <AddIcon/>
                  <ArrowRight sx={{ position: 'absolute', right: 4, opacity: 0 }} />
                </IconButton>
              </Tooltip>
              </ListItem>
            <Divider />
            <List
                sx={{
                    width: '100%',
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    maxHeight: '50vh',
                }}
                >
           {props && props.projectData.map(item => {
               return (<ProjectItem key={item.id} {...item}/>)
           }) }
           </List>
          </FireNav>
        </Paper>
      </ThemeProvider>
    </Box>
    
  );
}
