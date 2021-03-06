import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Grid from '@mui/material/Grid'
import Fab from '@mui/material/Fab';
import useMediaQuery from '@mui/material/useMediaQuery';
import axios from 'axios';

import './home.css';
import theme from '../theme'
import ProjectCard from '../ui-components/projectCard'
import PersistentDrawerLeft from '../ui-components/drawer';
import AddProject from '../project/addproject';
import { Typography } from "@mui/material";


export default function Home () {
    const [projectData, setProjectData] = useState([]);
    const [memberData, setMemberData] = useState([]);
    const [open, setOpen] = React.useState(false);
    const midScreen = useMediaQuery(theme.breakpoints.up('sm'));

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

    async function MemberData() {
        axios.defaults.withCredentials = true;
        axios
            .get('http://127.0.0.1:8000/member/', { withCredentials:true })
            .then((response) => {
                setMemberData(response.data.filter( item => item.id !== (JSON.parse(localStorage.getItem("userData")).id)))
            })
            .catch((error) => console.log(error));
        }

    React.useEffect(()=>{
        MemberData(); 
        ProjectData();  
    }, []);

        return (
            <div className='Home'>
            <PersistentDrawerLeft value={1}>
                <Typography variant='h5'>PROJECTS</Typography>
                <Grid container spacing={3} sx={{ marginTop:0 }}>
                {projectData && projectData.map(item => {
                return (
                    <Grid item xs={12} md={6}>
                    <ProjectCard key={item.id}{...item} users={memberData} ProjectData={ProjectData}/>
                    </Grid>)
                })}
            </Grid>
            {midScreen && <Button variant="contained" onClick={()=>setOpen(true)} sx={{ position: 'fixed', bottom: 30, right: 30 }}>
            <AddIcon/> Add Project
            </Button>}
            {!midScreen && <Fab size="medium" sx={{ position: 'fixed', bottom: 70, right: 30 }} onClick={()=>setOpen(true)} style={{backgroundColor:theme.palette.primary.main, color:"white"}}>
                <AddIcon/>
            </Fab>}
            <AddProject
            ProjectData={ProjectData}
            users={memberData}
            open={open}
            setOpen={setOpen}/>
            </PersistentDrawerLeft>
            
            </div>
        );
}