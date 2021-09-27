import React, { Component } from 'react';
import Button from '@mui/material/Button';
import { config } from '.././config.js';

class Login extends Component {
    
    login = (e) => {
        e.preventDefault();
        console.log(config.SITE_URL)
        window.location.assign(config.SITE_URL+"client_id="+config.CLIENT_ID+"&redirect_uri="+config.REDIRECT_URI);
        
    }

    render() {
        return (
            <div className="App">
            <h1>Workdesk</h1>
            <Button variant="contained" onClick={this.login}>Login with Channeli</Button>
            </div>
        );
    }
}
export default Login;