import React, { Component } from 'react';
import axios from 'axios'
import ChildList from '../child/ChildList'
import { Navigation } from 'react-router'
import {Link} from 'react-router-dom';
import AttendanceReportList from '../attendance/AttendanceReportList';
import renderLoadWait from '../common/loadUtil';
import NavBar from '../common/navbar'

export default class ClassInfo extends Component {

    mixins: [Navigation];

	constructor(props) {
        super(props);

        this.state = {
            classLoaded : false,
            teacherLoaded : false,
            childrenLoaded : false,

            user: window.store.getState().user
        };
    }

    componentDidMount() {
        this.loadClass();
    }

    loadClass = () => {
        let component  = this;
        axios.get('http://localhost:8080/classes/' + this.props.match.params.id)
        .then(function (response) {
            component.setState({
                class: response.data,
                classLoaded: true
            })

        axios.get('http://localhost:8080/users/TEACHER/' + response.data.teacherId)
            .then(function (response) {
                 component.setState({
                    teacher: response.data,
                    teacherLoaded: true
                })
            })

        axios.get('http://localhost:8080/classes/' + component.props.match.params.id + '/children')
            .then(function (response) {
             component.setState({
                 children: response.data,
                 childrenLoaded: true
            })
            })

        axios.get('http://localhost:8080/attendance/class/' + component.props.match.params.id)
            .then(function (response) {
                component.setState({
                    attendanceReports: response.data,
                    attendanceLoaded: true
                })
            })
        });
    }

    render() {
        return (
            <div id="component_root">
                <NavBar/>
                <div class="row page_label">
                    <span class="display-4">Class Info</span>
                </div>
                {this.props.location.state !== undefined && this.props.location.state.message !== undefined
                    ? <div class="alert alert-success col-6" role="alert">{this.props.location.state.message}</div>
                    : null
                }
                {this.state.classLoaded && this.state.teacherLoaded && this.state.childrenLoaded && this.state.attendanceLoaded
                    ?
                        <div class="row col-12">

                            <div class="row col-12">
                                <Link  class="btn btn-info" to={{
                                    pathname:'/attendance/' + this.state.class.id
                                }}>Take Attendance</Link>

                                <Link class="btn btn-info" to={{
                                    pathname:'/dismiss/' + this.state.class.id
                                }}>Dismiss</Link>

                                {
                                    this.state.user.type === 'ADMINISTRATOR' ?
                                        <Link class="btn btn-info" to={{
                                            pathname:'/class/addChild/' + this.state.class.id
                                        }}>Add Child</Link>
                                    : null
                                }

                                {
                                    this.state.user.type === 'ADMINISTRATOR' ?
                                        <Link class="btn btn-info" to={{
                                            pathname:'/class/removeChild/' + this.state.class.id
                                        }}>Remove Child</Link>
                                        : null
                                }

                            </div>

                            <div class="row col-12 top-spacer-10">
                                <div class="row col-12">
                                    <h5 class="display-5">Info</h5>
                                </div>
                                <span class="col-6">Name</span>
                                <span class="col-6">{this.state.class.name}</span>
                            </div>

                            <div class="row col-12">
                                <span class="col-6">Teacher</span>
                                <span class="col-6">{this.state.teacher.firstName} {this.state.teacher.lastName}</span>
                            </div>

                            <ChildList children={this.state.children}
                                       renderDeleteButtons={this.state.user.type === 'ADMINISTRATOR'}
                                       classId={this.state.class.id}
                            />

                            <AttendanceReportList attendanceReports={this.state.attendanceReports}/>
                        </div>
                    : renderLoadWait()
                }
            </div>
        );
 	}
}