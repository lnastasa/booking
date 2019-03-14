import React, { Component } from 'react';
import axios from 'axios'
import ChildList from '../child/ChildList'
import { Navigation } from 'react-router'
import {Link} from 'react-router-dom';
import AttendanceReportList from '../attendance/AttendanceReportList';

export default class ClassInfo extends Component {

    mixins: [Navigation];

	constructor(props) {
        super(props);

        this.state = {
            classLoaded : false,
            teacherLoaded : false,
            childrenLoaded : false
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
            <div>
            	<div>Class Info</div>
                {this.props.location.state !== undefined && this.props.location.state.message !== undefined
                    ? <div class="row"><div class="alert alert-success col-6" role="alert">{this.props.location.state.message}</div></div>
                    : null
                }
                {this.state.classLoaded && this.state.teacherLoaded && this.state.childrenLoaded && this.state.attendanceLoaded
                    ?
                        <div>
                            <div>Name : &nbsp; {this.state.class.name}</div>
                            <div>Teacher : &nbsp; {this.state.teacher.firstName} {this.state.teacher.lastName}</div>
                            <ChildList children={this.state.children}/>
                            <AttendanceReportList attendanceReports={this.state.attendanceReports}/>
                             <Link to={{
                               pathname:'/attendance/' + this.state.class.id
                            }}>Take Attendance</Link>
                        </div>
                    : <div>'Loading ....'</div>
                }
            </div>
        );
 	}
}