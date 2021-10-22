import './App.css';
import React from 'react';
import Login from "./components/pages/login"
import Auth from "./components/pages/auth"
import Home from "./components/pages/home"
import Users from "./components/pages/users"
import Dashboard from './components/pages/dashboard';
import ProjectDetails from "./components/pages/projectdetails"
import ProtectedRoute from "./components/protectedroute"
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";

function App() {
  return (
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/auth" component={Auth} />
        <ProtectedRoute exact path="/home" component={Home} />
        <ProtectedRoute path="/dashboard" component={Dashboard} />
        <ProtectedRoute path="/users" component={Users} />
        <ProtectedRoute path="/:id" component={ProjectDetails} />
      </Switch>
  );
}

export default App;