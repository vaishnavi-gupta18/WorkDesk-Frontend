import React, { useState, useEffect } from "react";
import axios from 'axios';
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Typography from "@material-ui/core/Typography";
import Collapse from '@mui/material/Collapse';
import StepContent from '@mui/material/StepContent';
import IconButton from "@material-ui/core/IconButton";
import { red, blue } from "@material-ui/core/colors";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Tooltip from '@mui/material/Tooltip';
import Stack from '@mui/material/Stack'
import ReactHtmlParser from 'react-html-parser';
import Avatar  from "@mui/material/Avatar";
import AvatarGroup  from "@mui/material/AvatarGroup";
import { useHistory } from 'react-router-dom';
import Chip from '@material-ui/core/Chip'
import theme from '../theme';

import { CardActionArea } from "@mui/material";
import EditCard from '../card/editCard'
import DeleteCard from '../card/deleteCard'

const useStyles = makeStyles({
  root: {
    maxWidth: 1000,
    background: 'linear-gradient( rgb(255 255 255) 30%, rgb(245 249 255) 90%)',
    borderRadius: 5,
    marginTop: 10,
  },
  header: {
    padding: 10
},
});


export default function TasksCard(props) {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [expanded, setExpand] = useState(false)
  const classes = useStyles();

  var date = props.due_date;
  date = date.slice(0,10);
  var time = props.due_date;
  time = time.slice(11,16);
  const due_date= 'Due '+date+', '+time+'';

  return (
    <Card className={classes.root} sx={{ margin:3 }} onMouseOver={()=>setExpand(true)} onMouseOut={()=>setExpand(false)} raised>
        <CardHeader
        className={classes.header}
        action={props && props.isMember &&
        <Stack direction="row" spacing={0}>
            <Tooltip title="Edit">
            <IconButton style={{ color: blue[800] }} aria-label="Edit" onClick={() => setEditOpen(true)}>
            <EditIcon />
            </IconButton>
            </Tooltip>
            
            <Tooltip title="Delete">
            <IconButton style={{ color: red[400] }} aria-label="Delete" onClick={() => setDeleteOpen(true)}>
            <DeleteIcon />
            </IconButton>
            </Tooltip>
        </Stack>       
        }
        titleTypographyProps={{variant:'h6'}}
        title={props && props.title}
        subheaderTypographyProps={{variant:'caption'}}
        subheader={due_date}
      />
      <Collapse in={expanded} timeout="auto">
       <CardContent onClick={() => setEditOpen(true)}>
            {ReactHtmlParser(props.description)} 
        </CardContent>
        </Collapse>
      <CardActions className={classes.action}>
      <Stack spacing={1} direction="row">
        <AvatarGroup max={2}>
        {props && props.assignees.map(item=>{
          return props.projectMembers.map(member => {
              if(member.id === item)
              return (<Tooltip title={member.fullname}><Avatar>{member.fullname.slice(0,1)}</Avatar></Tooltip>)
              })
          })} 
        </AvatarGroup>
        {props && props.listTitle && 
        <Chip label={props.listTitle} style={{ backgroundColor: theme.palette.secondary.light, color: "white" }} size="small"/>
        }
        {props && props.projectTitle && 
        <Chip label={props.projectTitle} style={{ backgroundColor: theme.palette.primary.light, color: "white" }} size="small"/>
        }
      </Stack>

      <EditCard
        data = {props}
        open={editOpen}
        setOpen={setEditOpen}
      />
      <DeleteCard
        data = {props}
        open={deleteOpen}
        setOpen={setDeleteOpen}
      />
      </CardActions>

          
    </Card>
  );
}
