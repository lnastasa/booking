import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Login from './login/login'
import AdministratorHome from './administrator/AdministratorHome'
import CreateTeacher from './teacher/CreateTeacher'
import TeacherHome from './teacher/TeacherHome'
import CompleteRegistration from './register/CompleteRegistration'

const App = () => (
  <Router>
    <div>
        <Route exact path="/" component={Login} />
        <Route exact path="/admin" component={AdministratorHome} />
        <Route exact path="/teacher" component={TeacherHome} />
        <Route exact path="/createTeacher" component={CreateTeacher} />
        <Route exact path="/register" component={CompleteRegistration} />
    </div>
  </Router>
);

export default App;