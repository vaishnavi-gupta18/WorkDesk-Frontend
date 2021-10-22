import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import ReactHtmlParser from 'react-html-parser';
import { Link, Route, Switch } from 'react-router-dom';
import Fab from '@mui/material/Fab';
import useMediaQuery from '@mui/material/useMediaQuery';

import PersistentDrawerLeft from '../ui-components/drawer';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { red, blue, grey } from "@material-ui/core/colors";
import { Stack } from "@mui/material";
import TaskDetails from "./taskdetails"
import ProtectedRoute from "../protectedroute"


import './home.css';
import AddList from "../list/addlist";
import AddCard from "../card/addCard";
import ProjectAccordion from "../ui-components/projectAccordion";
import TaskCard from "../ui-components/taskCard"
import theme from "../theme"

import EditDeleteList from "../list/editDeleteList";

const useStyles = makeStyles({
    item: {
        padding: 13,
        marginTop: 32,
        height: 'fit-content',
        color: 'white',
        background: theme.palette.primary.main + 'dd',
        borderRadius: 6,
        minWidth: 300,
        width: '25%'
    },
    container: {
        overflow: 'auto',
    },
  });

export default function ProjectDetails() {
    const { id } = useParams();
    const [projectData, setProjectData] = useState(null);
    const [isMember, setIsMember] = useState(false)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const classes = useStyles();
    const open = Boolean(anchorEl);
    const midScreen = useMediaQuery(theme.breakpoints.up('sm'));

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: 'white',
        backgroundColor: theme.palette.secondary.light,
        width: '50%'
      }));


    async function ProjectData() {
        axios.defaults.withCredentials = true;
        axios
            .get('http://127.0.0.1:8000/project/'+id+"/", { withCredentials:true })
            .then((response) => {
                if(response.status == 200)
                    setProjectData(response.data)
                    response.data.members.map(item => {
                        if(item.id === (JSON.parse(localStorage.getItem("userData")).id) || JSON.parse(localStorage.getItem("isAdmin")) === true)
                        setIsMember(true)
                    })
                    console.log(response.data)
            })
            .catch((error) => console.log(error));
        }
        
        
    React.useEffect(()=>{
        ProjectData();  
    }, []);

        return (
            <div className='ProjectDetails'>
            <PersistentDrawerLeft>
            <div>
            <ProjectAccordion data={projectData}/>
            </div>
            <Box sx={{ flexGrow: 1 }} className={classes.container}>

            <Stack direction="row" className={classes.root}> 
                {projectData && projectData.lists.map(item=> {
                    return (
                        <Stack className={classes.item} sx={{marginRight:3,marginTop:3}}>
                        <Stack direction="row" justifyContent="space-between">
                        <Item>{item.title}</Item>
                        {isMember && <EditDeleteList key={item.id}{...item}/>}
                        </Stack>
                        {item.cards.map(card => (
                            <TaskCard key={card.id} {...card} projectMembers={projectData.members} projectLists={projectData.lists} isMember={isMember}/>
                        )
                        )}
                        {isMember && <AddCard id={item.id} projectMembers={projectData.members}/>}
                        </Stack>
                    )
                })}
            </Stack>
            </Box>

            </PersistentDrawerLeft>
            {isMember && <AddList project_id={id}/>}
            <Switch>
            <Route exact path="/:id/task/:taskid?" component={TaskDetails} />
            </Switch>
            </div>
        );

}