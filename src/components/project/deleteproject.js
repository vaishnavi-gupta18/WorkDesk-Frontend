import React, { useState, useEffect } from "react";
import axios from 'axios';
import 'react-quill/dist/quill.snow.css';
import Button from '@mui/material/Button';
import { red, grey} from "@material-ui/core/colors";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Snackbar from '@mui/material/Snackbar';
import DeleteIcon from '@mui/icons-material/Delete';



const DeleteProject = (props) => {
    const { project_id, open, setOpen } = props;
    const [title, setTitle] = React.useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    async function ProjectData() {
        await axios
            .get('http://127.0.0.1:8000/project/'+props.project_id+'/')
            .then((response) => {
                setTitle(response.data.title);
            })
            .catch((error) => console.log(error));
        }
    
        React.useEffect(()=>{
            ProjectData(); 
        }, []);
  
    async function handleSubmit(e){
      e.preventDefault();
      axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
      axios.defaults.xsrfCookieName = 'csrftoken';
      return await axios
            .delete('http://127.0.0.1:8000/project/'+project_id+'/')
            .then((res) => {
                if(res.status === 204){
                    console.log(res)
                    setSubmitted(true);
                    setOpen(false);
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

  return (
    <div>
      <Dialog
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="dialog-title"
      >
        <DialogTitle>Delect Project</DialogTitle>
        <DialogContent>
         Are you sure you want to delete {title} ?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit} variant='contained' sx={{ marginBottom : 2 }} style={{ backgroundColor: red[400] }}>Delete</Button>
          <Button onClick={handleClose} sx={{ marginBottom : 2 } } style={{ color: grey[600] }}>Cancel</Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={submitted}
        autoHideDuration={6000}
        message="Project Deleted"
      />
    </div>
  );
};

export default DeleteProject;
