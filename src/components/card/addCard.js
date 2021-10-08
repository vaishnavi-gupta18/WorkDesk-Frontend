import React, { useState, useEffect } from "react";
import ReactQuill from 'react-quill';  
import axios from 'axios';
import 'react-quill/dist/quill.snow.css';
import {modules, formats} from '../project/richtextfield'
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


export default function AddCard(props){
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [dueError, setDueError] = React.useState(false);
  const [dueErrorMsg, setDueErrorMsg] = React.useState('');
  const [titleError, setTitleError] = React.useState(false);
  const [titleErrorMsg, setTitleErrorMsg] = React.useState('');
  const [memberData, setMemberData] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [start_date, setStartDate] = React.useState(curTime);
  const [due_date, setDueDate] = React.useState(curTime);
  const [assignees, setAssignees] = React.useState([]);

  var today = new Date(),
  curTime = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate() + 'T' + today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()  + 'Z';

  var handleDescriptionChange = (e) => {
    setDescription(e)
  }

  var handleAssigneeChange = (e,value) => {
    setAssignees(value.map(item=>item.id));
  }

  var handleDueDate = (e) => {
    setDueDate(e.target.value)
  }

  var handleStartDate = (e) => {
    setStartDate(e.target.value)
  }

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

    function MemberObjects(){
      let memberlist = []
      props.projectMembers.map(item=>{
      memberData.map(member => {
          if(member.id === item)
          memberlist.push(member)
          })
      }) 
      return memberlist
  }

    async function handleSubmit(e){
      e.preventDefault();
      if(title === '' || due_date === '')
      {
        if(title === ''){
        setTitleError(true);
        setTitleErrorMsg('Please enter a valid title')}
        else
        {
          setTitleError(false);
        setTitleErrorMsg('')
        }

        if(due_date === ''){
          setDueError(true);
          setDueErrorMsg('Please enter due date')}
        else{
          setDueError(false);
        setDueErrorMsg('')
        }
        
      }
      else{
        setTitleError(false);
        setTitleErrorMsg('')
        setDueError(false);
        setDueErrorMsg('')
      const data = {
        title: title,
        description: description,
        start_date: start_date,
        due_date: due_date,
        assignees: assignees,
        list: props.id
      }
      if(description === '' || description === '<p><br><p>')
      data.description = 'No description...'
      if(start_date === '')
      data.start_date = curTime
      console.log(data)
      axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
      axios.defaults.xsrfCookieName = 'csrftoken';
      return await axios
            .post('http://127.0.0.1:8000/List/'+props.id+'/card/', data)
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
      <Button variant="standard" onClick={handleClickOpen}>
        <AddIcon/> Add Card
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Card</DialogTitle>
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
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            variant="standard"
          />
          <FormGroup>
          <InputLabel autoFocus required sx={{ marginTop:3, width: 500 }}>Description</InputLabel>
          <ReactQuill theme="snow"    
            modules={modules}    
            formats={formats}
            value={description}
            onChange={handleDescriptionChange}
            id="description"
            label="description"/>
          </FormGroup>
          
          <InputLabel autoFocus required sx={{ marginTop:3, width: 500 }}>Start Date</InputLabel>
          <TextField
            id="datetime-local"
            type="datetime-local"
            onChange={handleStartDate}/>

          <InputLabel autoFocus required sx={{ marginTop:3, width: 500 }}>Due Date</InputLabel>
          <TextField
          error = {dueError}
          helperText = {dueErrorMsg}
            id="datetime-local"
            type="datetime-local"
            onChange={handleDueDate}/>

          
          <Stack spacing={3} sx={{ marginTop:3, width: 500 }}>
          <Autocomplete
            multiple
            id="assignees"
            options={MemberObjects()}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            getOptionLabel={(option) => typeof option === 'object'? option.fullname : "" }
            onChange={handleAssigneeChange}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Assignees"
                placeholder="Assign card to members"
              />
            )}
          />
          </Stack>
         
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit} variant='contained' sx={{ marginBottom : 2 }}>Create</Button>
          <Button onClick={handleClose} sx={{ marginBottom : 2 }}>Cancel</Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={submitted}
        autoHideDuration={6000}
        message="Card Created"
      />
    </div>
  );
}
