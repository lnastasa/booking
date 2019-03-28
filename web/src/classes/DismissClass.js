import React, { Component } from 'react';
import NavBar from '../common/navbar'
import renderLoadWait from '../common/loadUtil';
import axios from 'axios'
import {Link} from 'react-router-dom';

export default class DismissClass extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: window.store.getState().user,
            loaded: false,
            dismissalProgress: [],

            createFailed: false,

            guardianSelectedChild: 0,
            displayGuardianMenu: false,
            guardians: []
        }
    }

    componentDidMount() {
        let component  = this;
        axios.get('http://localhost:8080/classes/' + component.props.match.params.id + '/children')
        .then(function (response) {
            response.data.map(function (child) {
                return component.state.dismissalProgress.push(
                    {
                        childId: child.id,
                        dismissed: false
                    }
                )
            });
            component.setState({
                childList: response.data,
                loaded: true
            });
        })
    }

    dismissToParent(childId) {
        axios.post('http://localhost:8080/dismissal',
        {
            childId: childId,
            userId: this.state.user.id,
        }).then(response => {
            this.getDismissedChild(childId).dismissed = true;
            this.forceUpdate();
        });
    }

    dismissToGuardian(guardianId) {
        axios.post('http://localhost:8080/dismissal',
            {
                childId: this.state.guardianSelectedChild,
                guardianId: guardianId,
                userId: this.state.user.id
            }).then(response => {
            this.getDismissedChild(this.state.guardianSelectedChild).dismissed = true;
            this.cancelGuardian();
            this.forceUpdate();
        });
    }

    showGuardianMenu(childId) {
        let component  = this;
        this.setState({
            displayGuardianMenu: true,
            guardianSelectedChild: childId
        });
        axios.get('http://localhost:8080/guardians?childId=' + childId)
        .then(function (response) {
            component.setState({guardians: response.data})
        })
    }

    cancelGuardian() {
        this.setState({
            displayGuardianMenu: false,
            guardianSelectedChild: 0,
            guardians: []
        });
    }

    getDismissedChild(childId) {
        return this.state.dismissalProgress.find(child => {
            return child.childId === childId;
        });
    }

    render() {
        return (
            <div id="component_root" class="col-12">
                <NavBar/>
                <div class="row page_label">
                    <span class="display-4">Dismiss class</span>
                </div>
                {this.state.loaded
                    ? this.dismissal()
                    : renderLoadWait()
                }
            </div>
        )
    };

    dismissal() {
        return (
            <div class="row col-12">
                <span class="top-spacer-10 bottom-spacer-10">
                    Please select who is collecting each child
                </span>
                {
                    this.state.childList.map(function (child, index) {
                        return <div class="row col-12">
                            {
                                this.getDismissedChild(child.id).dismissed === false
                                ?
                                    <div class="row col-12">
                                        <div class="col-3">
                                            <button class="btn btn-info"
                                                    onClick={() => this.dismissToParent(child.id)}>
                                                Parent
                                            </button>
                                            <button class="btn btn-warning"
                                                    onClick={() => this.showGuardianMenu(child.id)}>
                                                Guardian
                                            </button>
                                        </div>
                                        <div class=".align-middle">
                                            {child.firstName +' '+child.lastName}
                                        </div>
                                    </div>
                                :
                                    null
                            }
                        </div>
                    }, this)
                }
                <div class="row col-12 top-spacer-10">
                    <div class="row col-12">
                        <div class="col-3">
                            <Link class="btn btn-secondary" to={{
                                pathname:'/class/' + this.props.match.params.id
                            }}>back</Link>
                        </div>
                    </div>
                </div>

                {
                    this.state.displayGuardianMenu
                    ?
                        <div id="myModal" class="modal">
                            <div class="modal-content">
                                <h5>Guardians</h5>
                                {
                                    this.state.guardians.length == 0
                                        ?
                                            <div>This child does not have any guardians</div>
                                        :
                                            <div>
                                                {
                                                    this.state.guardians.map(function (guardian) {
                                                        return <div>
                                                            <button class="btn btn-warning col-12" onClick={() => this.dismissToGuardian(guardian.id)}>
                                                                {guardian.name}
                                                            </button>
                                                        </div>
                                                    }, this)
                                                }
                                            </div>
                                }
                                <div class="top-spacer-10">
                                    <button class="btn btn-danger col-12" onClick={() => this.cancelGuardian()}>Cancel</button>
                                </div>
                            </div>
                        </div>
                    :
                        null
                }

            </div>
        )
    }
}