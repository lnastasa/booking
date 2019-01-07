import React, { Component } from 'react';
import UsersListItem from './UsersListItem';

export default class UsersList extends Component {

    render() {
        return (
            <div>
                {
                    this.props.users.length === 0
                    ?
                        <div> No users provided, something is wrong </div>
                    :
                        <ul>
                            {
                                this.props.users.map(function (user, index) {
                                    return <li><UsersListItem user={user} /></li>;
                                })
                            }
                        </ul>
                }
            </div>
        );
    }
}