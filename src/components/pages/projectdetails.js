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

import './home.css';
import ProjectAccordion from "../ui-components/projectAccordion";
import TaskCard from "../ui-components/taskCard"


export default function ProjectDetails() {
    const { id } = useParams();
    const [projectData, setProjectData] = useState(null);

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
            <Grid container spacing={5} sx={{ marginTop:0 }}>
                {projectData && projectData.lists.map(item=> {
                    return (
                        <Grid item xs={4} >
                        <Item>{item.title}</Item>
                        {item.cards.map(card => (
                            <TaskCard key={card.id} {...card}/>
                        )
                        )}
                        </Grid>
                    )
                })}
                
               
            </Grid>
            </Box>

            </PersistentDrawerLeft>
            
            </div>
        );

}