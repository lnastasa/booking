import React, { Component } from 'react';
import AttendanceReportListItem from './AttendanceReportListItem';

export default class AttendanceReportList extends Component {

    render() {
        return (
            <div class="row ">
                <h5 class="display-5 top-spacer-10">Attendance Report</h5>
                {
                    this.props.attendanceReports.length === 0
                        ?
                        <div class="col-6 col-offset-2 alert alert-warning" role="alert">No attendance reports</div>
                        :
                        <div class="row col-12">
                            {
                                this.props.attendanceReports.map(function (report, index) {
                                    return <AttendanceReportListItem report={report}/>;
                                })
                            }
                        </div>
                }
            </div>
        );
    }
}