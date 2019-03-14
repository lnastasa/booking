import React, { Component } from 'react';
import UsersListItem from './UsersListItem';

export default class UsersList extends Component {

    render() {
        return (
            <div class="row">
                {
                    this.props.users.length === 0
                    ?
                        <div class="col-6 col-offset-2 alert alert-warning" role="alert"> No users provided</div>
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
