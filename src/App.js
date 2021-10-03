import './App.css';
import React from 'react';
import Login from "./components/pages/login"
import Auth from "./components/pages/auth"
import Home from "./components/pages/home"
import ProjectDetails from "./components/pages/projectdetails"
import ProtectedRoute from "./components/protectedroute"
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";


// class connectionEx extends react.Component {
//   componentDidMount() {
//     const apiUrl = 'http://127.0.0.1:8000/login';
//     fetch(apiUrl)
//       .then((response) => response.json())
//       .then((data) => console.log(data));
//   }
//   render(){
//     return <div>Example Connection</div>;
//   }
// }

// export default connectionEx;

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/auth" component={Auth} />
        <ProtectedRoute path="/home" component={Home} />
        <ProtectedRoute exact path="/:id?" component={ProjectDetails} />
      </Switch>
  </Router>
  );
}

export default App;