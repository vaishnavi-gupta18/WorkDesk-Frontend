import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);



// import axios from 'axios';
// axios.get('/Project/').then(resp => {
//   console.log('Response', resp)
// }).catch(err => {
//   console.log('Error', err.response.status)
// });