import React, { useState, useEffect } from "react";
import axios from 'axios';
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import { red, blue } from "@material-ui/core/colors";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Tooltip from '@mui/material/Tooltip';
import Stack from '@mui/material/Stack'
import ReactHtmlParser from 'react-html-parser';
import { useHistory } from 'react-router-dom';

import StatusChip from './statuschip'
import EditProject from '../project/editproject'
import DeleteProject from '../project/deleteproject'
import MemberChip from './memberChip'

const useStyles = makeStyles({
  root: {
    maxWidth: 1000,
    background: 'linear-gradient( rgb(255 255 255) 30%, rgb(245 249 255) 90%)',
    borderRadius: 12,
    margin: 10,
    '&:hover': {
      background: 'rgb(256 256 256)',
      transform: 'translate(0%, -2%)',
      transition: 'transform 0.3s',
   },
  },
  action: {
      justifyContent: 'space-between'
  },
});


export default function ProjectCard(props) {
  const history = useHistory();
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [memberData, setMemberData] = useState([]);
  const classes = useStyles();
  const description = props.description ;
  const members = props.member
  var date = props.start_date;
  date = date.slice(0,10);
  var time = props.start_date;
  time = time.slice(11,16);
  const start_date = 'Created '+date+','+time

  async function MemberData() {
    axios
        .get('http://127.0.0.1:8000/member/')
        .then((response) => {
            setMemberData(response.data)
        })
        .catch((error) => console.log(error));
    }

    React.useEffect(()=>{
        MemberData();  
    }, []);

  return (
    <Card className={classes.root} raised sx={{ margin:3, width: 500 }}>
        <CardHeader
        onClick={() => history.push('/'+props.id)}
        action={
            <StatusChip status={props.status} />
        }
        title={props.title}
        subheader={start_date}
      />
      <CardContent>
            {ReactHtmlParser(description)}
      </CardContent>
      <CardActions className={classes.action}>
      <Stack direction="row" spacing={1}>
      {props.members.map(item=>{
        return memberData.map(member => {
            if(member.id === item)
            return (<MemberChip key={member.id} {...member}/>)
            })
        })} 
      </Stack>
      <Stack direction="row" spacing={1}>
      <Tooltip title="Edit">
        <IconButton style={{ color: blue[800] }} aria-label="Edit" onClick={() => setEditOpen(true)}>
          <EditIcon />
        </IconButton>
        </Tooltip>
        <EditProject
        project_id={props.id}
        open={editOpen}
        setOpen={setEditOpen}
      />
      <Tooltip title="Delete">
        <IconButton style={{ color: red[400] }} aria-label="Delete" onClick={() => setDeleteOpen(true)}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
        <DeleteProject
        project_id={props.id}
        open={deleteOpen}
        setOpen={setDeleteOpen}
        />
        </Stack>
      </CardActions>
    </Card>
  );
}
