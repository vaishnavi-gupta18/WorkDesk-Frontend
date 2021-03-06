import React, { useState, useEffect } from "react";
import axios from 'axios';
import moment from 'moment'
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
import useMediaQuery from '@mui/material/useMediaQuery';
import Tooltip from '@mui/material/Tooltip';
import Stack from '@mui/material/Stack'
import Avatar  from "@mui/material/Avatar";
import AvatarGroup  from "@mui/material/AvatarGroup";
import ReactHtmlParser from 'react-html-parser';
import { useHistory } from 'react-router-dom';

import StatusChip from './statuschip'
import EditProject from '../project/editproject'
import DeleteProject from '../project/deleteproject'
import MemberChip from './memberChip'
import theme from '../theme'

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
  const midScreen = useMediaQuery(theme.breakpoints.up('sm'));
  const history = useHistory();
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [memberData, setMemberData] = useState([]);
  const [isMemberorAdmin, setMemberorAdmin] = useState(false)
  const classes = useStyles();
  const description = props.description ;
  const members = props.member
  const start_date= 'Created on '+moment(props.start_date).format("MMM Do YYYY, h:mm a");

    React.useEffect(()=>{
      props.members.map(item => {
        if(item.id === (JSON.parse(localStorage.getItem("userData")).id) || JSON.parse(localStorage.getItem("isAdmin")) === true)
        setMemberorAdmin(true)
    })
  }, []);

  return (
    <Card className={classes.root} raised sx={{ margin:3, width: '50%' }}>
        <CardHeader
        onClick={() => history.push('/'+props.id)}
        action={
            <StatusChip status={props.status} size='medium'/>
        }
        titleTypographyProps={{variant:'h5'}}
        title={props.title}
        subheader={start_date}
        avatar={props && (props.logo!=null) && ((midScreen)?
          (<img src={props.logo} width='100'/>):(<img src={props.logo} width='50'/>))}
      />
      <CardContent>
            {ReactHtmlParser(description)}
      </CardContent>
      <CardActions className={classes.action}>
      <Stack direction="row" maxWidth='50%' spacing={1}>
      <AvatarGroup max={4}>
          {props && props.members.map(member => {
              return (<Tooltip title={member.fullname}>
                {(member.display_picture!=null)?(<Avatar src={`http://channeli.in${member.display_picture}`}/>):(<Avatar style={{ backgroundColor: blue[300], color: "white" }}>{member.fullname.slice(0,1)}</Avatar>)}
                </Tooltip>)
              })
          }
        </AvatarGroup>
      </Stack>
    
      { props && isMemberorAdmin && 
      <Stack direction="row" spacing={1}>
      <Tooltip title="Edit">
        <IconButton style={{ color: blue[800] }} aria-label="Edit" onClick={() => setEditOpen(true)}>
          <EditIcon />
        </IconButton>
        </Tooltip>
        <EditProject
        project_id={props.id}
        key={props.id}{...props}
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
        key={props.id}{...props}
        open={deleteOpen}
        setOpen={setDeleteOpen}
        />
        </Stack>
      }
      </CardActions>
    </Card>
  );
}
