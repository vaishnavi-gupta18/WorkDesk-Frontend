import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Grid from '@mui/material/Grid'
import axios from 'axios';

import './home.css';
import ProjectCard from '../ui-components/projectCard'
import PersistentDrawerLeft from '../ui-components/drawer';
import AddProject from '../project/addproject'
// import RegisterYourCatForm from '../project/test'


export default function Home () {
    const [projectData, setProjectData] = useState([]);
    const [open, setOpen] = React.useState(false);

    async function ProjectData() {
        axios.defaults.withCredentials = true;
        await axios.get('http://127.0.0.1:8000/home/', { withCredentials:true })
            .then((response) => {
                if(response.status == 200)
                    setProjectData(response.data)
                    console.log(response.data)
            })
           .catch((error)=>{
              console.log(error);
           }); 
    }

    React.useEffect(()=>{
        ProjectData();  
    }, []);

        return (
            <div className='Home'>
            <PersistentDrawerLeft>
                {/* <div className='project-container'>
                    {projects.map(item => <ProjectCard key={item.id} {...item} />)}
                </div> */}
                <Grid container spacing={3} sx={{ marginTop:0 }}>
                {projectData && projectData.map(item => {
                return (
                    <Grid item xs={6}>
                    <ProjectCard key={item.id}{...item} />
                    </Grid>)
                })}
            </Grid>
            <Button variant="contained" onClick={()=>setOpen(true)} sx={{ position: 'fixed', bottom: 30, right: 30 }}>
            <AddIcon/> Add Project
            </Button>
            <AddProject
            open={open}
            setOpen={setOpen}/>
            </PersistentDrawerLeft>
            
            </div>
        );
}