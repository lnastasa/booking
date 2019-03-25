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
                        <div class="row col-12">
                            {
                                this.props.users.map(function (user, index) {
                                    return <UsersListItem user={user} />;
                                })
                            }
                        </div>
                }
            </div>
        );
        }
}
