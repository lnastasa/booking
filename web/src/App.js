import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Login from './login/login'

import CreateTeacher from './teacher/CreateTeacher'
import CreateParent from './parent/CreateParent'
import CreateChild from './child/CreateChild'
import CreateGuardian from './guardian/CreateGuardian'
import CreateClass from './classes/CreateClass'

import AdministratorHome from './administrator/AdministratorHome'
import TeacherHome from './teacher/TeacherHome'
import ParentHome from './parent/ParentHome'

import TeacherInfo from './teacher/TeacherInfo'
import ParentInfo from './parent/ParentInfo'
import ChildInfo from './child/ChildInfo'
import ClassInfo from './classes/ClassInfo'

import TakeAttendance from './classes/TakeAttendance';

import CompleteRegistration from './register/CompleteRegistration'

const App = () => (
    <div>
        <Router>
            <div>
                <Route exact path="/" component={Login} />

                <Route exact path="/admin" component={AdministratorHome} />
                <Route exact path="/teacher" component={TeacherHome} />
                <Route exact path="/parent" component={ParentHome} />

                <Route exact path="/createTeacher" component={CreateTeacher} />
                <Route exact path="/createParent" component={CreateParent} />
                <Route exact path="/createChild" component={CreateChild} />
                <Route exact path="/createGuardian" component={CreateGuardian} />
                <Route exact path="/createClass" component={CreateClass} />

                <Route exact path="/teacher/:id" component={TeacherInfo} /> 
                <Route exact path="/parent/:id" component={ParentInfo} />
                <Route exact path="/child/:id" component={ChildInfo} />
                <Route exact path="/class/:id" component={ClassInfo} />

                <Route exact path="/register/:id" component={CompleteRegistration} />
                <Route exact path="/attendance/:id" component={TakeAttendance} />
            </div>  
        </Router>
    </div>
);

export default App;
