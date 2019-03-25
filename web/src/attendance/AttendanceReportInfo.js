import React, { Component } from 'react';
import axios from 'axios'
import moment from 'moment'
import renderLoadWait from '../common/loadUtil';
import NavBar from '../common/navbar'

export default class AttendanceReportInfo extends Component {

    constructor(props) {
        super(props);

        this.state = {
            reportLoaded : false,
            report: {},

            childrenLoaded:false,
            children: {}
        };
    }

    componentDidMount() {
        this.loadReport();
    }

    loadReport() {
        let component = this;
        axios.get('http://localhost:8080/attendance/report/' + component.props.match.params.id)
            .then(function (response) {
                component.setState({
                    report: response.data,
                    reportLoaded: true
                })

                axios.get('http://localhost:8080/classes/' + component.state.report.classId + '/children')
                    .then(function (response) {
                        component.setState({
                            children: response.data,
                            childrenLoaded: true
                        })
                    })
            })
    }

    getChild(childId) {
        return this.state.children.find(child => {
            return child.id === childId;
        });
    }

    render() {
        return (
            <div class="component_root col-12">
                <NavBar/>
                <div class="row page_label">
                    <span class="display-4">Attendance Report</span>
                </div>
            {
                this.state.reportLoaded && this.state.childrenLoaded ?
                    <div class="row col-12">
                        <div class="row col-12">
                            <div class="row col-12">
                                <span class="col-6">Date</span>
                                <span class="col-6">{moment.unix(this.state.report.timestamp).format('DD/MM/YYYY')}</span>
                            </div>
                        </div>

                        <div class="row col-12 top-spacer-10">
                            <h5 class="col-12 top-spacer-10">Children</h5>
                        </div>
                        <div class="row col-12">
                            {
                                this.state.report.attendance.map(function (attendance, index) {
                                    var child = this.getChild(attendance.childId)
                                    return <div class="row col-12">
                                        <span class="col-6">{child.firstName +' '+ child.lastName}</span>
                                        <span class="col-6">{''+attendance.present}</span>
                                    </div>
                                }, this)
                            }
                        </div>
                    </div>
                : renderLoadWait()
            }
            </div>
        );
    }
}