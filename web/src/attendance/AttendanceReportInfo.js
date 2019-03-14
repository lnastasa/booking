import React, { Component } from 'react';
import axios from 'axios'
import moment from 'moment'

export default class AttendanceReportInfo extends Component {

    constructor(props) {
        super(props);

        this.state = {
            reportLoaded : false,
            report: {},
        };
    }

    componentDidMount() {
        this.loadReport();
    }

    loadReport() {
        let component  = this;
        axios.get('http://localhost:8080/attendance/report/' + component.props.match.params.id)
        .then(function (response) {
            component.setState({
                report : response.data,
                reportLoaded : true
            })
        })
    }

    render() {
        return (
            <div>
            {
                this.state.reportLoaded ?
                    <div class="row">
                        <span>{moment.unix(this.state.report.timestamp).format('DD/MM/YYYY')}</span>
                        <div>
                            {
                                this.state.report.attendance.map(function (attendance, index) {
                                    return <div>{attendance.childId} {''+attendance.present}</div>
                                })
                            }
                        </div>
                    </div>
                :
                    <div>'Loading ....'</div>
            }
            </div>
        );
    }
}