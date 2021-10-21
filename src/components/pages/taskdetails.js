import React, { useState, useEffect, useRef } from "react";
import { useHistory, useParams} from 'react-router-dom';
import moment from 'moment'
import axios from 'axios';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';

import UserCard from '../ui-components/userCard'
import PersistentDrawerLeft from '../ui-components/drawer';
import { CardContent, DialogActions, DialogContent, Divider, FilledInput, IconButton, Stack, Typography } from "@mui/material";
import { DialogTitle } from "@material-ui/core";
import Avatar  from "@mui/material/Avatar";
import AvatarGroup  from "@mui/material/AvatarGroup";
import { Tooltip } from "@mui/material";
import MemberChip from "../ui-components/memberChip";
import SendIcon from '@mui/icons-material/Send';
import { TextField, Button, Paper, Card, CardHeader } from "@mui/material";
import InputBase from '@mui/material/InputBase';
import ReactHtmlParser from 'react-html-parser';
import theme from '../theme'



export default function TaskDetails() {
  const commentSection = useRef(null);
  const { taskid } = useParams();
  const history = useHistory();
  const name = (JSON.parse(localStorage.getItem("userData")).fullname).slice(0,1);
  const [open, setOpen] = useState(true);
  const [cardData, setCardData] = useState(null)
  const [message, setMessage] = useState('')
  const [comment, setComment] = useState([])

  const scrollToBottom = () => {
    commentSection.current.scrollTop = commentSection.scrollHeight;
  }

  async function CardData() {
    axios.defaults.withCredentials = true;
    axios
        .get('http://127.0.0.1:8000/Card/'+taskid+"/", { withCredentials:true })
        .then((response) => {
            if(response.status == 200)
                setCardData(response.data)
                setComment(response.data.comments_card)
                console.log(response.data)
        })
        .catch((error) => console.log(error));
    } 

    const client = new WebSocket('ws://127.0.0.1:8000/ws/chat/' + taskid + '/');
    
    React.useEffect(()=>{
        CardData(); 

        client.onopen = () => {
          console.log('WebSocket Client Connected');
        }; 

    }, []);

    React.useEffect(()=>{
      client.onmessage = function(resp){
        let data = JSON.parse(resp.data);
        console.log('got reply! ', data);
        let comments = comment
        console.log(comment)
        comments.push(data.message)
        setComment([...comments])
        scrollToBottom()
      };
    }, [comment]);

    const handleClose = () => {
      client.close();
      client.onclose = () => {
      console.log("Websocket disconnected");
      };
        setOpen(false);
        history.goBack()
      };

    function handleSubmit(e) {
      e.preventDefault()
      let data = {
        member : JSON.parse(localStorage.getItem("userData")).id,
        card : cardData.id,
        date_created : new Date(),
        body : message
      }
      client.send(JSON.stringify({
        message: data,
      }));
      setMessage('')
    }
    

  return (
    <div className="users">
        <PersistentDrawerLeft>
        <Dialog open={open}
        onClose={handleClose}
        fullWidth>

        {cardData && 
        <DialogTitle>
        <Stack direction='row' alignItems='center' justifyContent='space-between'>
        <Stack direction='column'>
        <Typography variant='h5'>{cardData && cardData.title}</Typography>
        <Typography variant='subtitle2'>Due {cardData && cardData.due_date.slice(0,10)}, {cardData && cardData.due_date.slice(11,16)}</Typography>
        </Stack>
        <Chip label={cardData.list.title} style={{ backgroundColor: theme.palette.secondary.light, color: "white" }} />
        </Stack>
        </DialogTitle>
      }

        {cardData &&
        
        <DialogContent>
          {ReactHtmlParser(cardData.description)} 
          <Stack spacing={1} direction="row">
          <Typography variant='subtitle1'>Assignees :</Typography>
          {cardData.assignees.map(item=>{
                return (<MemberChip key={item.id} {...item}/>)
                })} 
          </Stack><br/>
          <Divider/>
          <Paper style={{ overflow: 'auto', maxHeight: 300, boxShadow: 'none', }} ref={commentSection}>
              {comment && comment.map(item => {
                return(<Card >
                  <CardHeader
                    avatar={
                      <Avatar style={{ backgroundColor: theme.palette.primary.light, color: "white" }}>
                        {item.member.fullname.slice(0,1)}
                  </Avatar>
                    }
                    title={<Stack direction='row' spacing={2} alignItems='center'><Typography variant="subtitle1">{item.member.fullname}</Typography>
                    <Typography variant="subtitle2">{moment(item.date_created).fromNow()}</Typography></Stack>}
                    subheader={<Typography variant="body1">{item.body}</Typography>}
                  />
                </Card>)
            })}
        
            </Paper>
            <br/>
          <form onSubmit={handleSubmit}>
            <Stack spacing={2} direction='row' alignItems='center' justifyContent='space-evenly'>
              <Avatar>
                {name}
              </Avatar>
              <FilledInput
              value = {message} 
              onChange = {(e) => {setMessage(e.target.value)}}
              placeholder='Add a comment...'
              size="small"
              required
              fullWidth
              disableUnderline
              hiddenLabel/>
              <IconButton
              type='submit'>
                <SendIcon/>
              </IconButton>
              </Stack>
            </form>
        </DialogContent>

        }
        <DialogActions>
        <Button onClick={handleClose}  style={{ color: theme.palette.grey }}>Close</Button>
        </DialogActions>
        </Dialog>
        </PersistentDrawerLeft>
    </div>
  );
}
