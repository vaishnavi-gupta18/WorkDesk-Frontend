import React, { Component } from 'react';
import Button from '@mui/material/Button';
import { config } from '../../config.js';
import axios from 'axios';

class Login extends Component {

    async componentDidMount() {
        axios.defaults.withCredentials = true;
        await axios.get('http://127.0.0.1:8000/authenticate',{ withCredentials:true }).then(res => {
            if (res.status === 202)
            this.props.history.push("/home");
        });
    }

    
    login = (e) => {
        e.preventDefault();
        console.log(config.SITE_URL)
        window.location.assign(config.SITE_URL+"client_id="+config.CLIENT_ID+"&redirect_uri="+config.REDIRECT_URI);
        
    }

    render() {
        return (
            <div>
            <h1>Workdesk</h1>
            <Button variant="contained" onClick={this.login}>Login with Channeli</Button>
            </div>
        );
    }
}
export default Login;