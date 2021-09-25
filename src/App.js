import './App.css';
import React from 'react';
import Login from "./components/login"
import Auth from "./components/auth"
import Home from "./components/home"
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
      </Switch>
  </Router>
  );
}

export default App;