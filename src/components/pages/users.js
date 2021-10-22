import React, { useState, useEffect } from "react";
import axios from 'axios';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import UserCard from '../ui-components/userCard'
import PersistentDrawerLeft from '../ui-components/drawer';
import { Typography } from "@mui/material";



export default function Users() {
  const [memberData, setMemberData] = useState([]);
  const [admin_id, SetAdminId] = React.useState('')
  const [normal_id, SetNormalId] = React.useState('')

  async function MemberData() {
    axios.defaults.withCredentials = true;
    axios
        .get('http://127.0.0.1:8000/member/', { withCredentials:true })
        .then((response) => {
            setMemberData(response.data)
        })
        .catch((error) => console.log(error));
    }

    async function GroupData() {
        axios.defaults.withCredentials = true;
        axios
            .get('http://127.0.0.1:8000/group/', { withCredentials:true })
            .then((response) => {
                response.data.map(item => {
                    if(item.name === 'admin')
                    SetAdminId(item.id)
                    else if(item.name === 'normaluser')
                    SetNormalId(item.id)
                })
            })
            .catch((error) => console.log(error));
        }

    React.useEffect(()=>{
        MemberData();  
        GroupData();
    }, []);


  return (
    <div className="users">
        <PersistentDrawerLeft value={2}>
            <Box>
                <Typography variant="h5">
                    USERS
                </Typography>
            <Grid container spacing={3} sx={{ marginTop:0 }}>
                {memberData && admin_id && normal_id && memberData.map(item=> {
                    return (
                        <Grid item lg={3} md={4} sm={6} xs={12}>
                        <UserCard key={item.id} {...item} admin_id={admin_id} normal_id={normal_id}/>
                        </Grid>
                    )
                })}
            </Grid>
        </Box>
        </PersistentDrawerLeft>
    </div>
  );
}
