import React, { Component } from 'react';
import Button from '@mui/material/Button';
import axios from 'axios';

class Home extends Component {
    logout = (e) => {
        e.preventDefault();
        localStorage.clear();
        axios.get('http://127.0.0.1:8000/logout',{withCredentials: true}).then(resp => {
        console.log('Response', resp);this.props.history.push("/home");
        });
    }
    async componentDidMount() {
        axios.defaults.withCredentials = true;
        await axios.get('http://127.0.0.1:8000/Project/', { withCredentials:true })
            .then((response) => {
              console.log(response);            })
           .catch((error)=>{
              console.log(error);
           });
    }
    render() {
        return (
            <div>
            <h1>Workdesk</h1>
            <Button variant="contained" onClick={this.logout}>Logout</Button>
            </div>
        );
    }
}
export default Home;