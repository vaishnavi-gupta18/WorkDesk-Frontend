import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import ReactHtmlParser from 'react-html-parser';

import PersistentDrawerLeft from '../ui-components/drawer';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { red, blue, grey } from "@material-ui/core/colors";
import { Stack } from "@mui/material";



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
        // marginLeft: 32,
        marginTop: 32,
        height: 'fit-content',
        color: 'white',
        background: theme.palette.primary.main + 'dd',
        borderRadius: 6,
        minWidth: 300,
        width: '25%'
    },
    container: {
        height: '90%',
        // width: '90vw',
        overflow: 'auto',
    },
  });

export default function ProjectDetails() {
    const { id } = useParams();
    const [projectData, setProjectData] = useState(null);
    const [memberData, setMemberData] = useState(null);
    const [isMember, setIsMember] = useState(false)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const classes = useStyles();
    const open = Boolean(anchorEl);

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
                        if(item === (JSON.parse(localStorage.getItem("userData")).id))
                        setIsMember(true)
                    })
                    console.log(response.data)
            })
            .catch((error) => console.log(error));
        }

    async function MemberData() {
        axios.defaults.withCredentials = true;
        axios
            .get('http://127.0.0.1:8000/member/', { withCredentials:true })
            .then((response) => {
                setMemberData(response.data)
            })
            .catch((error) => console.log(error));
        }
        
    React.useEffect(()=>{
        ProjectData();  
        MemberData();
    }, []);

        return (
            <div className='ProjectDetails'>
            <PersistentDrawerLeft>
            <div>
            <ProjectAccordion data={projectData}/>
            </div>
            <Box sx={{ flexGrow: 1 }} className={classes.container}>
            {/* <Grid container sx={{ margin:0 }} className={classes.root}> 
                {projectData && projectData.lists.map(item=> {
                    return (
                        <Grid item xs={2.8} className={classes.item} sx={{marginRight:2,marginTop:3}}>
                        <Stack direction="row" justifyContent="space-between">
                        <Item>{item.title}</Item>
                        {isMember && <EditDeleteList key={item.id}{...item}/>}
                        </Stack>
                        {item.cards.map(card => (
                            <TaskCard key={card.id} {...card} projectMembers={projectData.members} projectLists={projectData.lists} isMember={isMember}/>
                        )
                        )}
                        {isMember && <AddCard id={item.id} projectMembers={projectData.members}/>}
                        </Grid>
                    )
                })}
            </Grid> */}

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
            
            </div>
        );

}