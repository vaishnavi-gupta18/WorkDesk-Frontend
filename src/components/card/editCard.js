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
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import AddIcon from '@mui/icons-material/Add';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';


const EditCard = (props) => {
  const { data, open, setOpen } = props;
  const filter = createFilterOptions();
  const theme = useTheme();
  const [titleError, setTitleError] = React.useState(false);
  const [titleErrorMsg, setTitleErrorMsg] = React.useState('');
  const [dueError, setDueError] = React.useState(false);
  const [dueErrorMsg, setDueErrorMsg] = React.useState('');
  const [value, setValue] = React.useState('');
  const [memberData, setMemberData] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [start_date, setStartDate] = React.useState(curTime);
  const [due_date, setDueDate] = React.useState(curTime);
  const [assignees, setAssignees] = React.useState([]);
  const [list,setList] = React.useState('');

  var today = new Date(),
  curTime = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate() + 'T' + today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()  + 'Z';


  var handleTitleChange = (e) => {
    setTitle(e.target.value);
  }

  var handleDescriptionChange = (e) => {
    setDescription(e)
  }

  var handleAssigneeChange = (e,value) => {
    setAssignees(value.map(item=>item.id));
  }

  var handleListChange = (e,value) => {
    if(value !== null)
    setList(value.id)
  }

  var handleStartDate = (e) => {
    setStartDate(e.target.value)
  }

  var handleDueDate = (e) => {
    setDueDate(e.target.value)
  }

    function CardAssigneesObjects(){
        let assigneelist = []
        props && props.data.assignees.map(item=>{
        props.data.projectMembers.map(member => {
            if(member.id === item)
            assigneelist.push(member)
            })
        }) 
        return assigneelist
    }

    function ListObjects(){ 
        let listobject
        props && props.data.projectLists.map(item => {
            if(item.id === props.data.list) 
            listobject = item})
        return listobject        
    }

    React.useEffect(()=>{
        setTitle(props.data.title);
        setDescription(props.data.description);
        setStartDate(props.data.start_date.slice(0,16))
        setDueDate(props.data.due_date.slice(0,16))
        setAssignees(props.data.assignees)
        setList(props.data.list)

    }, []);

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
        creator: props.data.creator,
        assignees: assignees,
        list: list, 
      }
      if(description === '' || description === '<p><br></p>')
      data.description = '<em style="color: rgb(119, 119, 119);">No description provided...</em>'
      if(start_date === '')
      data.start_date = curTime
      if(list === '')
      data.list = props.data.list
      console.log(data)
      axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
      axios.defaults.xsrfCookieName = 'csrftoken';
      return await axios
            .put('http://127.0.0.1:8000/List/'+props.data.list+'/card/'+props.data.id+'/', data)
            .then((res) => {
                if(res.status === 200){
                    console.log(res)
                    setOpen(false);
                    setSubmitted(true);
                    window.location.reload()
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
      <Dialog
      maxWidth='50%'
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="dialog-title"
      >
        <DialogTitle>{props && props.data.title}</DialogTitle>
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
            value={start_date}
            onChange={handleStartDate}/>

          <InputLabel autoFocus required sx={{ marginTop:3, width: 500 }}>Due Date</InputLabel>
          <TextField
            error = {dueError}
            helperText = {dueErrorMsg}
            id="datetime-local"
            type="datetime-local"
            value={due_date}
            onChange={handleDueDate}/>

          
           <Stack spacing={3} sx={{ marginTop:3, width: 500 }}>
          <Autocomplete
            multiple
            id="assignees"
            defaultValue={()=>CardAssigneesObjects()}
            options={props && props.data.projectMembers}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            getOptionLabel={(option) => typeof option === 'object'? option.fullname : "" }
            onChange={handleAssigneeChange}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Assignees"
                placeholder="Assign the task"
              />
            )}
          />
          </Stack>

           <Stack spacing={3} sx={{ marginTop:3, width: 500 }}>
          <Autocomplete
            selectOnFocus
            clearOnBlur
            required
            handleHomeEndKeys
            id="lists"
            defaultValue={()=>ListObjects()}
            options={props.data.projectLists}
            getOptionLabel={(option) => typeof option === 'object'? option.title : "" } 
            onChange={handleListChange}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} label="List" required/>
            )}
          />
          </Stack> 

         
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit} variant='contained' sx={{ marginBottom : 2 }}>Edit</Button>
          <Button onClick={handleClose} sx={{ marginBottom : 2 }} style={{ color: theme.palette.grey.main }}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditCard;
