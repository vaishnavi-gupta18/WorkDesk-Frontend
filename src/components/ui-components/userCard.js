import React, { useState, useEffect } from "react";
import axios from 'axios';
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Avatar from "@material-ui/core/Avatar"
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { red, blue } from "@material-ui/core/colors";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Tooltip from '@mui/material/Tooltip';
import Stack from '@mui/material/Stack'
import ReactHtmlParser from 'react-html-parser';
import { useHistory } from 'react-router-dom';

import StatusChip from './statuschip'
import DialogModal from '../project/editproject'
import DialogDelete from '../project/deleteproject'
import MemberChip from './memberChip'
import { Button } from "@mui/material";

const useStyles = makeStyles({
  root: {
    maxWidth: 1000,
    background: 'linear-gradient( rgb(255 255 255) 30%, rgb(245 249 255) 90%)',
    borderRadius: 12,
    margin: 10,
  },
  action: {
      justifyContent: 'right'
  },
});


export default function UserCard(props) {
  const classes = useStyles();
  const [isAdmin, SetAdmin] = React.useState(false)
  const [admin_id, SetAdminId] = React.useState('')

  const [userData, SetUserData] = React.useState(null)
  const [groupData, SetGroupData] = React.useState(null)

  async function UserData() {

      await axios
        .get('http://127.0.0.1:8000/user/'+props.users+'/')
        .then((response) => {
          console.log(response);
            SetUserData(response.data);
        })
        .catch((error) => console.log(error));
    }

    React.useEffect(()=>{
        UserData(); 
        (JSON.parse(localStorage.getItem("user")).groups).map(item => 
            { if(item === props.admin_id)
                SetAdmin(true);
            })
    }, []);

    async function ChangeAuthorisation(e){
        e.preventDefault();
        let groups = []
        {userData.groups.map(item => {
            if(item === props.admin_id)
            groups.push(props.normal_id)
            else
            groups.push(props.admin_id)
        })}
        const data = {
            username : userData.username,
            is_active : userData.is_active,
            groups : groups
        }
        console.log(data)
        axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
        axios.defaults.xsrfCookieName = 'csrftoken';
        return await axios
            .put('http://127.0.0.1:8000/user/'+userData.id+'/', data)
            .then((res) => {
                if(res.status === 200){
                    console.log(res);
                    window.location.reload();
                }
                else{
                    console.log(res);
                }
            })
            .catch((err) => {
                console.log(err);
            }) 
    }

    async function ChangeActivity(e){
      e.preventDefault();
      userData.is_active = !userData.is_active
      console.log(userData)
      axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
      axios.defaults.xsrfCookieName = 'csrftoken';
      return await axios
          .put('http://127.0.0.1:8000/user/'+userData.id+'/', userData)
          .then((res) => {
              if(res.status === 200){
                  console.log(res);
                  window.location.reload();
              }
              else{
                  console.log(res);
              }
          })
          .catch((err) => {
              console.log(err);
          }) 
  }


  return (
    <Card className={classes.root} raised sx={{ margin:3, width: 500 }}>
        <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
          {props.fullname.slice(0,1)}
          </Avatar>
        }
        title={props.fullname}
        subheader={props.position}
      />

    {isAdmin && <CardActions className={classes.action}>
      <Stack direction="row" spacing={1} sx={{width:'100%'}} className={classes.action}>
        {userData && userData.groups.map(item => {
          if(item === props.normal_id)
          return (<Button variant='outlined' sx={{ width: '70%'}} onClick={ChangeAuthorisation}>Make Admin </Button>)
          else
          return (<Button variant='outlined'sx={{ width: '70%'}} onClick={ChangeAuthorisation}>Make Normal User</Button>)
        })}
        <Button variant='outlined' sx={{ width: 'auto'}} onClick={ChangeActivity}>
          {userData && userData.is_active && "Disable"}
          {userData && !userData.is_active && "Enable"}
        </Button>

      </Stack>
      </CardActions>
        }
      
      
    </Card>
  );
}
