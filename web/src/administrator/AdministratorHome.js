import React, { Component } from 'react';
import { Navigation } from 'react-router'
import {Link} from 'react-router-dom';

export default class AdministratorHome extends Component {

    mixins: [Navigation];

    constructor(props) {
        super(props);
        this.state = {user: this.props.location.state.user};
    }

    render() {
        return (
            <div>
                <div>Admin home, {this.state.user.firstName}</div>
                <Link to={{
                       pathname:'/createTeacher',
                       state : { user: this.state.user }
                    }}>Create Teacher </Link>
            </div>
        )
    }
}
