import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import { useParams } from "react-router-dom";
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

import EditDeleteList from "../list/editDeleteList";


export default function ProjectDetails() {
    const { id } = useParams();
    const [projectData, setProjectData] = useState(null);
    const [anchorEl, setAnchorEl] = React.useState(null);
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
        backgroundColor: 'grey',
        width: '50%'
      }));


    async function ProjectData() {
        axios.defaults.withCredentials = true;
        axios
            .get('http://127.0.0.1:8000/project/'+id+"/", { withCredentials:true })
            .then((response) => {
                if(response.status == 200)
                    setProjectData(response.data)
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
            <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={4} sx={{ marginTop:0 }}>
                {projectData && projectData.lists.map(item=> {
                    return (
                        <Grid item xs={3}>
                        <Stack direction="row" spacing={15}>
                        <Item>{item.title}</Item>
                        <EditDeleteList key={item.id}{...item}/>
                        </Stack>
                        {item.cards.map(card => (
                            <TaskCard key={card.id} {...card} projectMembers={projectData.members} projectLists={projectData.lists}/>
                        )
                        )}
                        <AddCard id={item.id} projectMembers={projectData.members}/>
                        </Grid>
                    )
                })}
            </Grid>
            </Box>

            </PersistentDrawerLeft>
            <AddList project_id={id}/>
            
            </div>
        );

}