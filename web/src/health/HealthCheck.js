import React, { Component } from 'react';
import axios from 'axios'

export default class HealthCheck extends Component {

    constructor(props) {
        super(props);

        this.state = {
            healthy : true
        };
    }

    componentDidMount() {
        setInterval(this.checkState, 5000);
    }

    checkState() {
        let component = this;
        axios.get('http://http://localhost:8080/health')
            .then(function (response) {
                component.setState({healthy: true})
            })
            .catch(function (error) {
                component.setState({healthy: false});
            });
    }

    render() {
        return (
            <div class="row col-10 offset-2 bottom-spacer-10 justify-content-md-center">
                {this.state.healthy
                    ? null
                    : <p class="alert alert-danger" role="alert">Unable to connect to server</p>
                }
            </div>
        );
    }
}