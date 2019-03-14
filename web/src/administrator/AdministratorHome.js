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
            <div id="component_root">

                {this.props.location.state.message !== undefined
                    ? <div class="row"><div class="alert alert-success col-6" role="alert">{this.props.location.state.message}</div></div>
                    : null
                }
                <div class="row page_label">
                    <span class="display-4">Admin Home</span>
                </div>

                <div class="row button_row">
                    <Link class="btn btn-info" to={{
                        pathname:'/createTeacher'
                    }}>Create Teacher </Link>

                    <Link class="btn btn-info" to={{
                        pathname:'/createParent'
                    }}>Create Parent </Link>

                    <Link class="btn btn-info" to={{
                        pathname:'/createClass'
                    }}>Create Class </Link>
                </div>

                <div class="row top-spacer-10">
                    <h4>Teachers</h4>
                </div>
                <div class="row">
                    <div class="col-8">
                        <Users type='TEACHER' />
                    </div>
                </div>

                <div class="row top-spacer-10">
                    <h4>Parents</h4>
                </div>
                <div class="row">
                    <div class="col-8">
                        <Users type='PARENT' />
                    </div>
                </div>

                <div class="row top-spacer-10">
                    <h4>Children</h4>
                </div>
                <div class="row">
                    <div class="col-8">
                        <AllChildren />
                    </div>
                </div>

                <div class="row top-spacer-10">
                    <h4>Classes</h4>
                </div>
                <div class="row">
                    <div class="col-8">
                        <AllClasses />
                    </div>
                </div>

            </div>
        )
    }
}
