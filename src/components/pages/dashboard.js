
import React, { useState, useEffect } from "react";
import axios from 'axios';


import PersistentDrawerLeft from '../ui-components/drawer';

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

import ReactHtmlParser from 'react-html-parser';
import Public from '@mui/icons-material/Public';
import ProjectItem from "../ui-components/projectitem";
import { ListSubheader, Grid, Stack, } from "@mui/material";
import AddProject from "../project/addproject";
import EditDeleteList from "../list/editDeleteList"
import TaskCard from "../ui-components/taskCard"

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: 'white',
    backgroundColor: 'grey',
    width: '50%'
  }));

export default function Dashboard() {
    const [open, setOpen] = React.useState(false);
    const [projectData, setProjectData] = React.useState([]);
    const [cardData, setCardData] = React.useState([]);

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
      })

    async function ProjectData() {
        axios.defaults.withCredentials = true;
        axios
            .get('http://127.0.0.1:8000/userproject/', { withCredentials:true })
            .then((response) => {
                if(response.status == 200)
                    setProjectData(response.data)
                    console.log(response.data)
            })
            .catch((error) => console.log(error));
        }
    
     async function CardData() {
        axios.defaults.withCredentials = true;
        axios
            .get('http://127.0.0.1:8000/usercard/', { withCredentials:true })
            .then((response) => {
                if(response.status == 200)
                    {const sorted = [...response.data].sort((a, b) => b['id'] - a['id']);
                    console.log(response.data)
                    setCardData(sorted)
                }
            })
            .catch((error) => console.log(error));
        }
        
        React.useEffect(()=>{
            ProjectData();  
            CardData();
        }, []);
    

        return (
            <div className='Dashboard'>
                <PersistentDrawerLeft>
    
                    <Box sx={{
                        width:'100%',
                        height:'90%',
                        top:0
                    }}>
                    


    <Box sx={{ display: 'flex'}}>
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
        <Paper elevation={0} sx={{ minWidth: '100%'}}>
          <FireNav component="nav" sx={{ maxWidth: '100%'}} disablePadding>
          <ListItem component="div" disablePadding key={0}>
            <ListItemButton>
              <ListItemText
                sx={{ my: 0 }}
                primary="Dashboard"
                primaryTypographyProps={{
                  fontSize: 20,
                  fontWeight: 'medium',
                  letterSpacing: 0,
                }}
              />
               <Divider/>
            </ListItemButton>
              </ListItem>
            <Divider />
            <Stack direction='row'>
            <List
                sx={{
                    width: '30%',
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    maxHeight: '78vh'
                }}
                >
                    <ListSubheader sx={{ top:-12, }}>
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
                onClick={()=>setOpen(true)}
                >
                  <AddIcon/>
                  <ArrowRight sx={{ position: 'absolute', right: 4, opacity: 0 }} />
                </IconButton>
              </Tooltip></ListItemButton>
                    </ListSubheader>
           {projectData && projectData.map(item => {
               return (<ProjectItem key={item.id}{...item}/>)
           }) }
           </List>

           <List
                sx={{
                    width: '70%',
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    maxHeight: '78vh'
                }}
                >
                    <ListSubheader sx={{ top:-12, }}>
            <ListItemButton>
              <ListItemIcon sx={{ fontSize: 20 }}><LayersIcon /></ListItemIcon>
              <ListItemText
                sx={{ my: 0 }}
                primary="My Tasks"
                primaryTypographyProps={{
                  fontSize: 20,
                  fontWeight: 'medium',
                  letterSpacing: 0,
                }}
              />
               <Divider/>
            
           </ListItemButton>
                    </ListSubheader>


                    <Grid container spacing={4} sx={{ marginTop:0, marginLeft:0 }}>
                    {projectData && projectData.map(item=> {
                    return (
                        <Grid item xs={5}>
                        <Stack direction="row" spacing={15}>
                        <Item>{item.title}</Item>
                        </Stack>
                        {item.lists && item.lists.map(list => { 
                            return (
                                <div>{cardData && cardData.map(card => {
                                    if(card.list === list.id)
                                    return(
                                        <TaskCard key={card.id} {...card} projectMembers={item.members} projectLists={item.lists} listTitle={list.title}/>
                                    )})}</div>
                            )
                        })}
        
                        </Grid>
                    )
                })}
                   
                
            </Grid>


           </List>
           </Stack>


           
          </FireNav>
        </Paper>
      </ThemeProvider>
    </Box>
                </Box>

    
                    
                </PersistentDrawerLeft>
            <AddProject
            open={open}
            setOpen={setOpen}/>
            
            </div>
        );

}