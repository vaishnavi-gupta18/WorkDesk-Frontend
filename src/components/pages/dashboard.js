import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link, Route, Switch } from 'react-router-dom';
import PersistentDrawerLeft from '../ui-components/drawer';
import Box from '@mui/material/Box';
import { Grid } from "@mui/material";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Typography } from "@mui/material";

import ProjectCard from "../ui-components/projectCard";
import TaskCard from "../ui-components/taskCard";
import TaskDetails from "./taskdetails"

export default function Dashboard() {
  const [value, setValue] = React.useState('project');
  const [memberData, setMemberData] = useState([]);
  const [projectData, setProjectData] = React.useState([]);
  const [cardData, setCardData] = React.useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
        ProjectData();
        MemberData();  
        CardData();
    }, []);



  return (
    <PersistentDrawerLeft value={0}>
    <Typography variant='h5'>DASHBOARD</Typography>
    <Box sx={{ width: '100%'}}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange}>
            <Tab label="Projects" value="project" />
            <Tab label="Tasks" value="task" />
          </TabList>
        </Box>
        <TabPanel value="project" sx={{ padding:0 }}>
        <Grid container spacing={3} sx={{ marginTop:0 }}>
                {projectData && projectData.map(item => {
                return (
                    <Grid item xs={12} md={6}>
                    <ProjectCard key={item.id}{...item} users={memberData} />
                    </Grid>)
                })}
            </Grid>
        </TabPanel>
        <TabPanel value="task" sx={{ padding:0 }}>
        <Grid container spacing={4} sx={{ marginTop:0}}>
            {projectData && projectData.map(item => {
                return(
                    item.lists.map(list => {
                        return(
                            cardData.map(card => {
                                if(card.list === list.id)
                                return(
                                <Grid item xs={12} sm={6} lg={3} md={4}>
                                <TaskCard key={card.id} {...card} projectMembers={item.members} projectLists={item.lists} listTitle={list.title} projectTitle={item.title} isMember={true}/>
                                </Grid>
                                )
                            })
                        )
                    })
                )
            })}
            </Grid>
        </TabPanel>
      </TabContext>
    </Box>
    <Switch>
            <Route exact path="/dashboard/task/:taskid?" component={TaskDetails} />
    </Switch>
    </PersistentDrawerLeft>
  );
}
