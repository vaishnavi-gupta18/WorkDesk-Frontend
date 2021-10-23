import React, { useState, useEffect } from "react";
import ReactQuill from 'react-quill';  
import axios from 'axios';
import 'react-quill/dist/quill.snow.css';
import {modules, formats} from './richtextfield'
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


export default function AddProject(props) {
  const { open, setOpen } = props;
  const filter = createFilterOptions();
  const theme = useTheme();
  const [value, setValue] = React.useState('');
  const [titleError, setTitleError] = React.useState(false);
  const [titleErrorMsg, setTitleErrorMsg] = React.useState('');
  const [memberData, setMemberData] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  var today = new Date(),
  curTime = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate() + 'T' + today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()  + 'Z';

  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [logo, setLogo] = React.useState('');
  const [start_date, setStartDate] = React.useState(curTime);
  const [members, setMembers] = React.useState([]);
  const [status, setStatus] = React.useState('In Progress');
  const [is_public, setPublic] = React.useState(true);


  var handleTitleChange = (e) => {
    setTitle(e.target.value);
  }

  var handleDescriptionChange = (e) => {
    setDescription(e)
  }

  var handleLogoChange = (e) => {
    setLogo(e.target.files[0])
  }

  var handleMemberChange = (e,value) => {
    setMembers(value.map(item=>item.id));
  }

  var handleStartDate = (e) => {
    setStartDate(e.target.value)
  }

  var handlePublicChange = (e) => {
    setPublic(e.target.checked)
  }
    const statuslist = [
      {title : "In Progress"},
      {title : "Testing"},
      {title : "Completed"},
    ];

    async function handleSubmit(e){
      e.preventDefault();
      const config = { headers:{ 'Content-Type': 'multipart/form-data'}};
      members.push(JSON.parse(localStorage.getItem("userData")).id)
      if(title === '')
      {setTitleError(true);
        setTitleErrorMsg('Please enter a valid title')
      }
      else{
        setTitleError(false);
        setTitleErrorMsg('')
      if(description === '' || description === '<p><br></p>')
      setDescription('<em style="color: rgb(119, 119, 119);">No description provided...</em>')
      if(status === '')
      setStatus('In Progress')
      if(start_date === '')
      setStartDate(curTime)
      axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
      axios.defaults.xsrfCookieName = 'csrftoken';
      axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
      let formData = new FormData()
      formData.append('title',title)
      formData.append('description',description)
      formData.append('start_date',start_date)
      members.forEach(v => formData.append('members', v))
      formData.append('status',status)
      formData.append('is_public',is_public)
      formData.append('logo',logo)
      console.log(logo)
      return await axios
            .post('http://127.0.0.1:8000/project/', formData)
            .then((res) => {
                if(res.status === 201){
                    console.log(res)
                    setOpen(false);
                    setSubmitted(true);
                    props.ProjectData()
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
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Project</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            error = {titleError}
            margin="dense"
            id="title"
            label="Title"
            value={title}
            helperText={titleErrorMsg}
            onChange={handleTitleChange}
            fullWidth
            variant="standard"
          />
          <FormGroup>
          <InputLabel autoFocus sx={{ marginTop:3, width: 500 }}>Description</InputLabel>
          <ReactQuill theme="snow"  
            error = {titleError}  
            modules={modules}    
            formats={formats}
            value={description}
            onChange={handleDescriptionChange}
            id="description"
            label="description"/>
          </FormGroup>

          <InputLabel sx={{ marginTop:3, width: '50%' }}>Logo</InputLabel>
          <TextField
            id="logo"
            type="file"
            accept=".jpg,.jpeg,.png,.svg"
            onChange={handleLogoChange}
          />
          
          <InputLabel autoFocus required sx={{ marginTop:3, width: 500 }}>Start Date</InputLabel>
          <TextField
            id="datetime-local"
            type="datetime-local"
            required
            onChange={handleStartDate}/>

          
          <Stack spacing={3} sx={{ marginTop:3, width: '100%' }}>
          <Autocomplete
            multiple
            id="members"
            options={props && props.users}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            getOptionLabel={(option) => typeof option === 'object'? option.fullname : "" }
            onChange={handleMemberChange}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Members"
                placeholder="Select project members"
              />
            )}
          />
          </Stack>

          <Stack spacing={3} sx={{ marginTop:3, width: '100%' }}>
          <Autocomplete
            value={value}
            required
            onChange={(event, newValue) => {
              if (typeof newValue === 'string') {
                setValue({
                  title: newValue,
                });
                setStatus(newValue)
              } else if (newValue && newValue.inputValue) {
                // Create a new value from the user input
                setValue({
                  title: newValue.inputValue,
                });
                setStatus(newValue.inputValue)
              } else {
                setValue(newValue);
                if(newValue === null)
                setStatus('')
                else
                setStatus(newValue.title)
              }
            }}

            filterOptions={(options, params) => {
              const filtered = filter(options, params);
              const { inputValue } = params;
              // Suggest the creation of a new value
              const isExisting = options.some((option) => inputValue === option.title);
              if (inputValue !== '' && !isExisting) {
                filtered.push({
                  inputValue,
                  title: `Add "${inputValue}"`,
                });
              }
              return filtered;
            }}

            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            id="status"
            options={statuslist}
            getOptionLabel={(option) => {
              // Value selected with enter, right from the input
              if (typeof option === 'string') {
                return option;
              }
              // Add "xxx" option created dynamically
              if (option.inputValue) {
                return option.inputValue;
              }
              // Regular option
              return option.title;
            }}
            renderOption={(props, option) => <li {...props}>{option.title}</li>}
            freeSolo
            renderInput={(params) => (
              <TextField {...params} label="Status" />
            )}
          />
          </Stack>

          <FormControlLabel control={<Switch defaultChecked onChange={handlePublicChange}/>} label="Public" />
         
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit} variant='contained' sx={{ marginBottom : 2 }}>Create</Button>
          <Button onClick={handleClose} sx={{ marginBottom : 2 }} style={{ color: theme.palette.grey.main }}>Cancel</Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={submitted}
        autoHideDuration={2000}
        onClose={()=>setSubmitted(false)}
        message="Project Created"
      />
    </div>
  );
}
