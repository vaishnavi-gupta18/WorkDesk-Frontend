import React, { Component } from 'react';
import axios from 'axios';
import { CircularProgress } from '@mui/material';

class Auth extends Component {
    async componentDidMount() {
        let param = window.location.href.split('?')[1];
        let query= new URLSearchParams(param);
        let code = query.get('code')
        
        
        await axios.get('http://127.0.0.1:8000/workdesk/after_login?code='+code+'&state=state',{withCredentials: true}).then(resp => {
        console.log('Response', resp);localStorage.setItem("isAuthenticated", "true");localStorage.setItem("user", resp.data);
        });

        await axios.get('http://127.0.0.1:8000/member/'+localStorage.getItem("user")+'/',{withCredentials: true}).then(resp => {
        console.log('Response', resp.data);localStorage.setItem("userData", JSON.stringify(resp.data));
        });

        await axios.get('http://127.0.0.1:8000/user/'+(JSON.parse(localStorage.getItem("userData")).users)+'/',{withCredentials: true}).then(resp => {
        console.log('Response', resp.data);localStorage.setItem("user", JSON.stringify(resp.data));
        resp.data.groups.map(item => {
            if(item.name === 'admin')
            localStorage.setItem("isAdmin",true)
            else 
            localStorage.setItem("isAdmin",false)
        })
        this.props.history.push("/home");
        });

    }

    render() {
        return (
            <div className='App'>
                {/* <CircularProgress/> */}

            </div>
        );
    }
}

export default Auth;