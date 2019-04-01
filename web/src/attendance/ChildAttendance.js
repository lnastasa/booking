import React, { Component } from 'react';
import moment from "moment/moment";
import axios from 'axios'
import renderLoadWait from '../common/loadUtil';

export default class ChildAttendance extends Component {

    constructor(props) {
        super(props);

        this.state = {
            attendance: {},
            attendanceLoaded : false
        };
    }

    componentDidMount() {
        this.loadAttendance();
    }

    loadAttendance() {
        let component  = this;
        axios.get('http://localhost:8080/attendance/child/' + this.props.childId)
        .then(function (response) {
            component.setState({
                attendance: response.data,
                attendanceLoaded: true
            });
        })
    }

    render() {
        return (
            <div class="row col-12 top-spacer-10">
                <h5 class="display-5 top-spacer-10">Attendance Report</h5>
                {this.state.attendanceLoaded
                    ?
                    <div class="row col-12">
                        <div class="row col-12">
                            <span class="col-6 row_header">Date</span>
                            <span class="col-6 row_header">Attendance</span>
                        </div>
                        {
                            this.state.attendance.map(function (attendance, index) {
                                return <div class="row col-12">
                                        <span class="col-6">{moment.unix(attendance.timestamp).format('DD/MM/YYYY')}</span>
                                        <span class="col-6">{'' + attendance.present}</span>
                                </div>;
                            })
                        }
                    </div>
                    : renderLoadWait()
                }
            </div>
        );
    }
}