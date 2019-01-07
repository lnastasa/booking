import React, { Component } from 'react';
import axios from 'axios'
import UsersList from './UsersList';

export default class Users extends Component {

    constructor(props) {
        super(props);

        this.state = {componentLoaded : false};
    }

    componentDidMount() {
        this.loadUsers();
    }

    loadUsers = () => {
        let component  = this;
        axios.get('http://localhost:8080/users/' + this.props.type)
        .then(function (response) {
            component.setState({
                usersList: response.data,
                componentLoaded: true
            });
        })
    }

    render() {
        return (
            <div>
                {this.state.componentLoaded
                    ? <UsersList users={this.state.usersList} />
                    : <div>'Loading ....'</div>
                }
            </div>
        );
  }
}