import React, { Component } from 'react';
import axios from 'axios'
import moment from 'moment'
import {Link} from 'react-router-dom';
import GuardianList from '../guardian/GuardianList';
import ChildAttendance from '../attendance/ChildAttendance';
import DismissalReport from '../attendance/DismissalReport';
import renderLoadWait from '../common/loadUtil';
import NavBar from '../common/navbar'

export default class ChildInfo extends Component {

	constructor(props) {
        super(props);

        this.state = {
            childLoaded : false,
            guardiansLoaded : false,

            user: window.store.getState().user
        };
    }

    componentDidMount() {
        this.loadChild();
    }

    loadChild = () => {
        let component  = this;
        axios.get('http://localhost:8080/childs/' + this.props.match.params.id)
        .then(function (response) {
            component.setState({
                child: response.data,
                childLoaded: true
            });
        })
        axios.get('http://localhost:8080/guardians?childId=' + this.props.match.params.id)
        .then(function (response) {
            component.setState({
                guardians: response.data,
                guardiansLoaded: true
            });
        })
    }

    render() {
        return (
            <div id="component_root">
                <NavBar/>
                <div class="row page_label">
                    <span class="display-4">Child Info</span>
                </div>
                {this.state.childLoaded && this.state.guardiansLoaded
                    ?
                    	<div class="row col-12">
                            <div class="row col-12">
                                {
                                    this.state.user.type === 'ADMINISTRATOR' || this.state.user.type === 'PARENT' ?
                                        <Link class="btn btn-info"
                                              to={{pathname:'/createGuardian',
                                                  state : { child: this.state.child }
                                              }}>Add Guardian
                                        </Link>
                                        : null
                                }
                            </div>

                    		<div class="row col-12 top-spacer-10">
                                <div class="row col-12 top-spacer-10">
                                    <h5 class="display-5">Info</h5>
                                </div>
                                <div class="row col-12">
                                    <span class="col-6">Name</span>
                                    <span class="col-6">{this.state.child.firstName +' '+ this.state.child.lastName}</span>
                                </div>
                                <div class="row col-12">
                                    <span class="col-6">Date of Birth</span>
                                    <span class="col-6">{moment.unix(this.state.child.dateOfBirth).format('DD/MM/YYYY')}</span>
                                </div>
                            </div>

                            <div class="top-spacer-10">&nbsp;</div>
                            <div class="row col-12 top-spacer-10">
                                <h5 class="display-5">Guardians</h5>
                                <GuardianList guardians={this.state.guardians}/>
                            </div>

                            <ChildAttendance childId={this.state.child.id}/>

                            <DismissalReport childId={this.state.child.id}/>

                    	</div>
                    : renderLoadWait()
                }
            </div>
        );
 	}
}