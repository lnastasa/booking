import React, { Component } from 'react';
import axios from 'axios'
import renderLoadWait from '../common/loadUtil';
import moment from "moment/moment";

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
            <div class="row col-12">
                <h5 class="display-5 top-spacer-10">Dismissal Report</h5>
                {this.state.loaded
                    ?
                    <div class="row col-12">
                        {this.state.data}
                    </div>
                    : renderLoadWait()
                }
            </div>
        );
    }
}