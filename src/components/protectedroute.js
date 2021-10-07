import React, { useState, useEffect } from "react";
import { Route, Redirect } from 'react-router-dom'
import axios from 'axios';

function ProtectedRoute({ component: Component, ...restOfProps }) {
  const [isAuth, setIsAuth] = useState('');


  async function CheckLogin(){
    axios.defaults.withCredentials = true;
        await axios.get('http://127.0.0.1:8000/authenticate',{ withCredentials:true }).then(res => {
            if (res.status === 202)
            setIsAuth('loggedin')
        })
        .catch((err) => {
          setIsAuth('notloggedin');
      })
  }

  React.useEffect(()=>{
    CheckLogin();  
  }, []);

    
    
    return (
      <Route
        {...restOfProps}
        render={(props) =>{
          if(isAuth){
          if(isAuth === 'loggedin')
          {
            return(<Component {...props} />)
          }
          else
          return(<Redirect to="/" />)
        }}
        }
      />
    );
  }
  

export default ProtectedRoute