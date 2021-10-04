import React, { useState, useEffect } from "react";
import axios from 'axios';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import UserCard from '../ui-components/userCard'
import PersistentDrawerLeft from '../ui-components/drawer';



export default function Users() {
  const [memberData, setMemberData] = useState([]);

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
        MemberData();  
    }, []);


  return (
    <div className="users">
        <PersistentDrawerLeft>
            <Grid container spacing={4} sx={{ marginTop:0 }}>
                {memberData && memberData.map(item=> {
                    return (
                        <Grid item xs={4}>
                        <UserCard key={item.id} {...item}/>
                        </Grid>
                    )
                })}
            </Grid>
        </PersistentDrawerLeft>
    </div>
  );
}
