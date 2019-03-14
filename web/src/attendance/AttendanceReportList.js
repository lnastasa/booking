import React, { Component } from 'react';
import AttendanceReportListItem from './AttendanceReportListItem';

export default class AttendanceReportList extends Component {

    render() {
        return (
            <div class="row">
                {
                    this.props.attendanceReports.length === 0
                        ?
                        <div class="col-6 col-offset-2 alert alert-warning" role="alert">No attendance reports</div>
                        :
                        <ul>
                            {
                                this.props.attendanceReports.map(function (report, index) {
                                    return <li>
                                        <AttendanceReportListItem report={report}/>
                                    </li>;
                                })
                            }
                        </ul>
                }
            </div>
        );
    }
}