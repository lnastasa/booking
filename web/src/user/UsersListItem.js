import React, { Component } from 'react';

export default class UserListItem extends Component {

    render() {
        return (
            <div>{this.props.user.firstName} {this.props.user.lastName}</div>
        );
  }
}