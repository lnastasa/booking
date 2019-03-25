import React, { Component } from 'react';
import { Navigation } from 'react-router'
import {Link} from 'react-router-dom';
import Users from '../user/Users';
import AllChildren from '../child/AllChildren';
import AllClasses from '../classes/AllClasses';
import NavBar from '../common/navbar'

export default class AdministratorHome extends Component {

    mixins: [Navigation];

    render() {
        return (
            <div id="component_root" class="col-12">
                <NavBar/>

                {this.props.location.state !== undefined
                    && this.props.location.state.message !== undefined
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
                    <AllChildren />
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
