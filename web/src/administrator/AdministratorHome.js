import React, { Component } from 'react';
import { Navigation } from 'react-router'
import {Link} from 'react-router-dom';
import Users from '../user/Users';
import AllChildren from '../child/AllChildren';
import AllClasses from '../classes/AllClasses';

export default class AdministratorHome extends Component {

    mixins: [Navigation];

    constructor(props) {
        super(props);
        this.state = {
            user: this.props.location.state.user,
            message: this.props.location.state.message
        };
    }

    render() {
        return (
            <div>
                {this.state.message !== undefined
                    ? <div>{this.state.message}</div>
                    : null
                }
                <div>Admin Home</div>
                <Link to={{
                       pathname:'/createTeacher'
                    }}>Create Teacher </Link>
                <Link to={{
                       pathname:'/createParent'
                    }}>Create Parent </Link>

                <div>
                    Teachers
                    <Users type='TEACHER' />
                </div>

                <div>
                    Parents
                    <Users type='PARENT' />
                </div>

                <div>
                    Children
                    <AllChildren />
                </div>

                <div>
                    Classes
                    <AllClasses />
                </div>

                <div>
                    <Link to={{
                       pathname:'/createClass'
                    }}>Create Class </Link>
                </div>

            </div>
        )
    }
}
