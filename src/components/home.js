import React, { Component } from 'react';

class Home extends Component {
    logout = (e) => {
        e.preventDefault();
        localStorage.clear();
        window.location.href = '/';
        
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