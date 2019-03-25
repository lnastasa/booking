import React, { Component } from 'react';
import axios from 'axios'
import renderLoadWait from '../common/loadUtil';
import NavBar from '../common/navbar'

export default class TakeAttendance extends Component {

    constructor(props) {
        super(props);

        this.state = {
            childrenLoaded : false,
            attendanceReport : [],

            createFailed: false
        };
    }

    componentDidMount() {
        this.loadInfo();
    }

    toggleAttendance(childId) {
        this.state.attendanceReport.map(function (attendanceRecord) {
            if (childId === attendanceRecord.childId) {
                attendanceRecord.present = !attendanceRecord.present;
            }
        })
        this.forceUpdate();
    }

    getChild(childId) {
        return this.state.children.find(child => {
            return child.id === childId;
        });
    }

    submitAttendance() {
        axios.post('http://localhost:8080/attendance',
            {
                classId: this.props.match.params.id,
                attendance: this.state.attendanceReport
            })
            .then(response => {
                this.props.history.push({
                    pathname:'/class/' + this.props.match.params.id ,
                    state : {
                        message: 'Attendance taken successfully'
                    }
                })
            }).catch(error => {
                this.setState({createFailed: true});
            });
    }

     loadInfo = () => {
        let component  = this;
        axios.get('http://localhost:8080/classes/' + component.props.match.params.id + '/children')
        .then(function (response) {
            response.data.map(function (child) {
                return component.state.attendanceReport.push(
                    {
                        childId: child.id,
                        present: true
                    }
                )
            });
            component.setState({
                children: response.data,
                childrenLoaded: true
            })
        })
    };


    render() {
        return (
            <div id="component_root" class="col-12">
                <NavBar/>

                <div class="row page_label">
                    <span class="display-4">Take Attendance</span>
                </div>

                {this.state.createFailed
                    ? <div class="alert alert-danger col-4" role="alert">Unable to save attendance report</div>
                    : null
                }
                <div class="row">
                    {this.state.childrenLoaded ? this.renderAttendanceReport() : renderLoadWait() }
                </div>

                <div class="row top-spacer-10">
                    <button class="btn btn-info" type="button"
                        onClick={() => this.submitAttendance()}
                    >Submit</button>
                </div>
            </div>
        )
    }

    renderAttendanceReport() {
        return (
            this.state.attendanceReport.map(function (attendanceRecord) {
                var child = this.getChild(attendanceRecord.childId)
                return <div
                    class={'row col-7 attendance_record_row_' + attendanceRecord.present}
                    onClick={() => this.toggleAttendance(attendanceRecord.childId)}
                >
                    <span class="col-4">{child.firstName} </span>
                    <span class="col-4">{child.lastName} </span>
                    <span class="col-2">
                        {attendanceRecord.present ? 'Present' : 'Absent'}
                    </span>
                </div>

            }, this)
        )
    }
}
