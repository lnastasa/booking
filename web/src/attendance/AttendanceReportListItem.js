import React, { Component } from 'react';
import moment from 'moment'
import {Link} from 'react-router-dom';

export default class AttendanceReportListItem extends Component {

    render() {
        return (
            <div class="row">
                <Link to={{pathname:'/attendance/report/' + this.props.report.id}}>
                    {moment.unix(this.props.report.timestamp).format('DD/MM/YYYY')}
                </Link>
            </div>
        );
    }
}