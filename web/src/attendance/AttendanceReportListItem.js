import React, { Component } from 'react';
import moment from 'moment'
import {Link} from 'react-router-dom';

export default class AttendanceReportListItem extends Component {

    render() {
        return (
            <div class="row col-12">
                <span class="col-6">
                    <Link to={{pathname:'/attendance/report/' + this.props.report.id}}>
                        {moment.unix(this.props.report.timestamp).format('DD/MM/YYYY')}
                    </Link>
                </span>
            </div>
        );
    }
}