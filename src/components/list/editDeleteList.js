import React, { useState, useEffect } from "react";
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Snackbar from '@mui/material/Snackbar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { ListItemIcon } from "@material-ui/core";
import { IconButton } from "@mui/material";
import { red, blue, grey } from "@material-ui/core/colors";

export default function EditDeleteList(props) {
  const project_id = props.project;
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [title, setTitle] = React.useState('');
  const [start_date, setStartDate] = React.useState('');
  const [Esubmitted, setESubmitted] = useState(false);
  const [Dsubmitted, setDSubmitted] = useState(false);

  const open = Boolean(anchorEl);
  var today = new Date(),
  curTime = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate() + 'T' + today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()  + 'Z';

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEditClose = () => {
    setEditOpen(false);}

  const handleDeleteClose = () => {
    setDeleteOpen(false);}

  var handleTitleChange = (e) => {
        setTitle(e.target.value);
      }

   var handleStartDate = (e) => {
    setStartDate(e.target.value)
  }
    

  React.useEffect(()=>{
        setTitle(props.title);
        setStartDate(props.start_date.slice(0,16));
    },props);

    async function handleEdit(e){
        e.preventDefault();
        const data = {
          title: title,
          start_date: start_date,
          project: props.project
        }
        axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
        axios.defaults.xsrfCookieName = 'csrftoken';
        return await axios
              .put('http://127.0.0.1:8000/project/'+props.project+'/list/'+props.id+'/', data)
              .then((res) => {
                  if(res.status === 200){
                      console.log(res)
                      setEditOpen(false);
                      setESubmitted(true);
                      window.location.reload();
                  }
                  else{
                      console.log(res)
                      setESubmitted(false);
                  }
              })
              .catch((err) => {
                  setESubmitted(false);
                  console.log(err);
              })
      }

      async function handleDelete(e){
        e.preventDefault();
        axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
        axios.defaults.xsrfCookieName = 'csrftoken';
        return await axios
              .delete('http://127.0.0.1:8000/project/'+props.project+'/list/'+props.id+'/')
              .then((res) => {
                  if(res.status === 204){
                      console.log(res)
                      setDSubmitted(true);
                      setDeleteOpen(false);
                      window.location.reload();
                  }
                  else{
                      console.log(res)
                      setDSubmitted(false);
                  }
              })
              .catch((err) => {
                  setDSubmitted(false);
                  console.log(err);
              })
      }
  
    


  return (
    <div>
        <IconButton aria-controls="basic-menu"
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined} 
            onClick={handleClick}>
            <MoreHorizIcon/>
        </IconButton>
                
        <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
                'aria-labelledby': 'basic-button',}}>
        <MenuItem onClick={() => setEditOpen(true)}> <ListItemIcon><EditIcon /></ListItemIcon> Edit</MenuItem>
        <MenuItem onClick={() => setDeleteOpen(true)}><ListItemIcon><DeleteIcon /></ListItemIcon>Delete</MenuItem>
        </Menu>

        <Dialog
      open={editOpen}
      onClose={() => setEditOpen(false)}
      aria-labelledby="dialog-title"
      >
        <DialogTitle>Edit List</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="title"
            label="Title"
            value={title}
            onChange={handleTitleChange}
            fullWidth
            variant="standard"
          />
          
          <InputLabel autoFocus required sx={{ marginTop:3, width: 500 }}>Start Date</InputLabel>
          <TextField
            id="datetime-local"
            type="datetime-local"
            value={start_date}
            onChange={handleStartDate}/>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleEdit} variant='contained' sx={{ marginBottom : 2 }}>Edit</Button>
          <Button onClick={handleEditClose} sx={{ marginBottom : 2 }}>Cancel</Button>
        </DialogActions>
      </Dialog>

      <Dialog
      open={deleteOpen}
      onClose={() => setDeleteOpen(false)}
      >
        <DialogTitle>Delete List</DialogTitle>
        <DialogContent>
         Are you sure you want to delete {title} ? <br/>All the tasks within the list will also get deleted.
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDelete} variant='contained' sx={{ marginBottom : 2 }} style={{ backgroundColor: red[400] }}>Delete</Button>
          <Button onClick={handleClose} sx={{ marginBottom : 2 } } style={{ color: grey[600] }}>Cancel</Button>
        </DialogActions>
      </Dialog>
       <Snackbar
        open={Dsubmitted}
        autoHideDuration={6000}
        message="List Deleted"
      />
    </div>
  );
}

