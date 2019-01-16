import React, { Component } from 'react';

export default class CreateChild extends Component {

    mixins: [Navigation];

    constructor(props) {
        super(props)
        this.state = {
            user: this.props.location.state.user,
            parent : this.props.location.state.parent
        };
    }

    handleSubmit(event) {
        
   }

    handleInputChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {
        return (
            <div>
                <div>Create Child for {this.state.parent.firstName} {this.state.parent.lastName}</div>
            </div>
        )
    }
}
