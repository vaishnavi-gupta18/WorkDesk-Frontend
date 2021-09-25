import React, { Component } from 'react';
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
            <button onClick={this.login}>Login with Channeli</button>
            </div>
        );
    }
}
export default Login;