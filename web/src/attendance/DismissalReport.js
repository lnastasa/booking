import React, { Component } from 'react';
import axios from 'axios'
import renderLoadWait from '../common/loadUtil';
import DismissalReportItem from './DismissalReportItem';

export default class DismissalReport extends Component {

    constructor(props) {
        super(props)

        this.state = {
            data: {},
            loaded : false
        };
    }

    componentDidMount() {
        let component  = this;
        axios.get('http://localhost:8080/dismissal/child/' + this.props.childId)
            .then(function (response) {
                component.setState({
                    data: response.data,
                    loaded: true
                });
            })
    }

    render() {
        return (
            <div class="row col-12 top-spacer-10">
                <h5 class="display-5 top-spacer-10">Dismissal Report</h5>
                <div class="row col-12">
                    <span class="col-4 row_header">Date</span>
                    <span class="col-4 row_header">Dismissed By</span>
                    <span class="col-4 row_header">Dismissed To</span>
                </div>
                {this.state.loaded
                    ? this.state.data.map(function (item, index) {
                        return <DismissalReportItem item={item}/>
                    })
                    : renderLoadWait()
                }
            </div>
        );
    }
}