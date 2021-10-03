import React, { Component } from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';

import './home.css';
import ProjectCard from '../ui-components/projectCard'
import PersistentDrawerLeft from '../ui-components/drawer';
import FormDialog from '../project/addproject'
// import RegisterYourCatForm from '../project/test'


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

    create = (e) => {
        e.preventDefault();
        // let data = {creator: 3,
        //     description: "<p>test</p>",
        //     is_public: true,
        //     members: [3],
        //     start_date: "2021-09-10T14:33:31Z",
        //     status: "In Progress",
        //     title: "Project1",
        //     lists: [1]
        // }
        let data = {"title":"Project5","description":"Testing","start_date":"2021-10-29T20:39:00Z","creator":3,"members":[3],"status":"In Progress","is_public":true}
        axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
        axios.defaults.xsrfCookieName = 'csrftoken';
        console.log(JSON.stringify({data}));
        axios.post('http://127.0.0.1:8000/project/',JSON.stringify({data}),{headers: {
            'Content-type': 'application/json'
        }}).then(resp => {
        console.log('Response', resp);
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
            <FormDialog/>
            
            </div>
        );
    }
}
export default Home;