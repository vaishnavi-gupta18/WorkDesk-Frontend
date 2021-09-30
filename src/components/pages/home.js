import React, { Component } from 'react';
import Button from '@mui/material/Button';
import axios from 'axios';

import './home.css';
import ProjectCard from '../ui-components/card'
import PersistentDrawerLeft from '../ui-components/drawer';

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            projects: []
        };
    }
    logout = (e) => {
        e.preventDefault();
        localStorage.clear();
        axios.get('http://127.0.0.1:8000/logout',{withCredentials: true}).then(resp => {
        console.log('Response', resp);this.props.history.push("/");
        });
    }

    async componentDidMount() {
        axios.defaults.withCredentials = true;
        let response = await axios.get('http://127.0.0.1:8000/home/', { withCredentials:true })
            .then(console.log('Data retrieved'))
           .catch((error)=>{
              console.log(error);
           });
        this.setState({
            projects: response.data,
          });
        console.log(this.state.projects)    
    }

    render() {
        const { projects } = this.state;
        return (
            <div className='Home'>
            <PersistentDrawerLeft>
                <div className='project-container'>
                    {projects.map(item => <ProjectCard key={item.id} {...item} />)}
                </div>
                <Button variant="contained" onClick={this.logout}>Logout</Button>

            </PersistentDrawerLeft>


            </div>
        );
    }
}
export default Home;