import React, { useState, useEffect } from "react";
import ReactQuill from 'react-quill';  
import axios from 'axios';
import 'react-quill/dist/quill.snow.css';
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete,{ createFilterOptions } from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import FormGroup from '@mui/material/FormGroup';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import AddIcon from '@mui/icons-material/Add';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';


export default function AddList(props) {
  const theme = useTheme();
  
  const [open, setOpen] = React.useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [titleError, setTitleError] = React.useState(false);
  const [titleErrorMsg, setTitleErrorMsg] = React.useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  var today = new Date(),
  curTime = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate() + 'T' + today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()  + 'Z';

  const [title, setTitle] = React.useState('');
  const [start_date, setStartDate] = React.useState(curTime);


  var handleTitleChange = (e) => {
    setTitle(e.target.value);
  }

  var handleStartDate = (e) => {
    setStartDate(e.target.value)
  }

    async function handleSubmit(e){
      e.preventDefault();
      if(title === '')
      {
        setTitleError(true);
        setTitleErrorMsg('Please enter a valid title')
      }
      else{
        setTitleError(false);
        setTitleErrorMsg('')
      const data = {
        title: title,
        start_date: start_date,
        project: props.project_id
      }
      if(start_date === '')
      data.start_date = curTime
      axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
      axios.defaults.xsrfCookieName = 'csrftoken';
      return await axios
            .post('http://127.0.0.1:8000/project/'+props.project_id+'/list/', data)
            .then((res) => {
                if(res.status === 201){
                    console.log(res)
                    setOpen(false);
                    setSubmitted(true);
                    window.location.reload();
                }
                else{
                    console.log(res)
                    setSubmitted(false);
                    <Alert severity="error">Some error occured. List couldn't be created.</Alert>
                }
            })
            .catch((err) => {
                setSubmitted(false);
                console.log(err);
            })
      }
    }

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen} sx={{ position: 'fixed', bottom: 30, right: 30 }}>
      <AddIcon/> Add List
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add List</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            error = {titleError}
            helperText = {titleErrorMsg}
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
            onChange={handleStartDate}/>
         
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit} variant='contained' sx={{ marginBottom : 2 }}>Create</Button>
          <Button onClick={handleClose} sx={{ marginBottom : 2 }}>Cancel</Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={submitted}
        autoHideDuration={6000}
        message="List Created"
      />
    </div>
  );
}
