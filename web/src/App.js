import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Login from './login/login'

import CreateTeacher from './teacher/CreateTeacher'
import CreateParent from './parent/CreateParent'

import AdministratorHome from './administrator/AdministratorHome'
import TeacherHome from './teacher/TeacherHome'
import ParentHome from './parent/ParentHome'

import CompleteRegistration from './register/CompleteRegistration'

const App = () => (
  <Router>
    <div>
        <Route exact path="/" component={Login} />

        <Route exact path="/admin" component={AdministratorHome} />
        <Route exact path="/teacher" component={TeacherHome} />
        <Route exact path="/parent" component={ParentHome} />

        <Route exact path="/createTeacher" component={CreateTeacher} />
        <Route exact path="/createParent" component={CreateParent} />

        <Route exact path="/register/:id" component={CompleteRegistration} />
    </div>
  </Router>
);

export default App;
