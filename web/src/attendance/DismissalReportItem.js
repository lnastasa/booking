import React, { Component } from 'react';
import moment from "moment/moment";
import axios from 'axios'

export default class DismissalReportItem extends Component {

    constructor(props) {
        super(props)

        this.state = {
            userName: '',
            guardianName : ''
        };
    }

    componentDidMount() {
        let component  = this;
        axios.get('http://localhost:8080/users/ADMINISTRATOR/' + this.props.item.userId)
            .then(function (response) {
                component.setState({
                    userName: response.data.firstName +' '+ response.data.lastName,
                });
            })

        if (this.props.item.guardianId !== 0) {
            axios.get('http://localhost:8080/guardians/' + this.props.item.guardianId)
                .then(function (response) {
                    component.setState({
                        guardianName: response.data.firstName +' '+ response.data.lastName,
                    });
                })
        }
    }


    render() {
        return (
            <div class="row col-12">
                <span class="col-4">{moment.unix(this.props.item.timestamp).format('DD/MM/YYYY')}</span>
                <span class="col-4">{this.state.userName}</span>
                <span class="col-4">
                {
                    this.props.item.guardianId === 0
                    ? "Parent"
                    : this.state.guardianName
                }
                </span>
            </div>
        );
    }
}