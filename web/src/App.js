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
import ClassAddChild from './classes/ClassAddChild';
import ClassRemoveChild from './classes/ClassRemoveChild';

import TakeAttendance from './classes/TakeAttendance';
import DismissClass from './classes/DismissClass';

import CompleteRegistration from './register/CompleteRegistration'
import AttendanceReportInfo from "./attendance/AttendanceReportInfo";

import HealthCheck from './health/HealthCheck'

const App = () => (
    <div class="row col-12">
        <Router>
            <div class="row col-12">
                <HealthCheck/>
                <Route exact path="/" component={Login} />

                <Route exact path="/administrator" component={AdministratorHome} />
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
                <Route exact path="/class/addChild/:id" component={ClassAddChild} />
                <Route exact path="/class/removeChild/:id" component={ClassRemoveChild} />

                <Route exact path="/register/:id" component={CompleteRegistration} />
                <Route exact path="/attendance/:id" component={TakeAttendance} />
                <Route exact path="/dismiss/:id" component={DismissClass} />
                <Route exact path="/attendance/report/:id" component={AttendanceReportInfo} />
            </div>
        </Router>
    </div>
);

export default App;
