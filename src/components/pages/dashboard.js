import { Button, Stack, Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from 'axios';


import PersistentDrawerLeft from '../ui-components/drawer';
import HorizontalNonLinearStepper from '../ui-components/test'
import CustomizedList from '../ui-components/projectcontainer'
import VerticalLinearStepper from '../ui-components/test3'



export default function Dashboard() {
    const [projectData, setProjectData] = React.useState([]);
    const [cardData, setCardData] = React.useState([]);

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
                    setCardData(response.data)
                    console.log(response.data)
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
    
                    <Grid container spacing={4} sx={{ marginTop:0 }}>
                        <Grid item xs={6}>
                    <CustomizedList projectData={projectData}/>
                        </Grid>
                        <Grid item xs={6}>
                    <VerticalLinearStepper cardData={cardData}/>
                    </Grid></Grid>
                    <HorizontalNonLinearStepper/>
                    
                </PersistentDrawerLeft>
           
            
            </div>
        );

}