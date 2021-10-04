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
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import StatusChip from './statuschip'
import DialogModal from '../project/editproject'
import DialogDelete from '../project/deleteproject'
import MemberChip from './memberChip'
import { CardActionArea } from "@mui/material";

const useStyles = makeStyles({
  root: {
    maxWidth: 1000,
    background: 'linear-gradient( rgb(255 255 255) 30%, rgb(245 249 255) 90%)',
    borderRadius: 5,
    marginTop: 10,
  },
  action: {
      justifyContent: 'space-between'
  },
});


export default function TasksCard(props) {
  const history = useHistory();
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [memberData, setMemberData] = useState([]);
  const [expanded, setExpand] = useState(false)
  const classes = useStyles();

  var date = props.due_date;
  date = date.slice(0,10);
  var time = props.due_date;
  time = time.slice(11,16);
  const due_date= 'Due '+date+', '+time+'';


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
    <Card className={classes.root} sx={{ margin:3 }} onMouseOver={()=>setExpand(true)} onMouseOut={()=>setExpand(false)}>
        <CardHeader
        className={classes.header}
        action={
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
        title={props && props.title}
        subheader={due_date}
      />
      <Collapse in={expanded} timeout="auto">
       <CardContent>
            {ReactHtmlParser(props.description)} 
        </CardContent>
        </Collapse>
      <CardActions>
      <Stack spacing={1} direction="row">
        <AvatarGroup max={1}>
        {props && props.assignees.map(item=>{
          return memberData.map(member => {
              if(member.id === item)
              return (<Tooltip title={member.fullname}><Avatar>{member.fullname.slice(0,1)}</Avatar></Tooltip>)
              })
          })} 
        </AvatarGroup>
      </Stack>
      </CardActions>
    </Card>
  );
}
