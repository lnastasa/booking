import React, { Component } from 'react';
import Login from './login/login'
import AdministratorHome from './administrator/AdministratorHome'
import CreateTeacher from './teacher/CreateTeacher'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const App = () => (
  <Router>
    <div>
        <Route exact path="/" component={Login} />
        <Route exact path="/admin" component={AdministratorHome} />
        <Route exact path="/createTeacher" component={CreateTeacher} />
    </div>
  </Router>
);

export default App;
