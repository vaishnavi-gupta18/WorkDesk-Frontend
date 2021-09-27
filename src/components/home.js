import React, { Component } from 'react';
import axios from 'axios';

class Home extends Component {
    logout = (e) => {
        e.preventDefault();
        localStorage.clear();
        window.location.href = '/';
        
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
            <button onClick={this.logout}>Logout</button>
            </div>
        );
    }
}
export default Home;