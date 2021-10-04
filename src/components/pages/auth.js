import React, { Component } from 'react';
import axios from 'axios';

class Auth extends Component {
    async componentDidMount() {
        let param = window.location.href.split('?')[1];
        let query= new URLSearchParams(param);
        let code = query.get('code')
        
        
        await axios.get('http://127.0.0.1:8000/workdesk/after_login?code='+code+'&state=state',{withCredentials: true}).then(resp => {
        console.log('Response', resp);localStorage.setItem("isAuthenticated", "true");localStorage.setItem("user", resp.data);
        });

        await axios.get('http://127.0.0.1:8000/member/'+localStorage.getItem("user")+'/',{withCredentials: true}).then(resp => {
        console.log('Response', resp.data);localStorage.setItem("userData", JSON.stringify(resp.data));this.props.history.push("/home");
        });

    }

    render() {
        return (
            <div>
            <h1>Workdesk</h1>
            </div>
        );
    }
}

export default Auth;