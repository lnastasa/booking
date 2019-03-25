import React, { Component } from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom';
import ChildList from '../child/ChildList'
import renderLoadWait from '../common/loadUtil';
import NavBar from '../common/navbar'

export default class ParentInfo extends Component {

    mixins: [Navigation];

	constructor(props) {
        super(props);

        this.state = {
            parentInfoLoaded : false,
            childrenInfoLoaded : false
        };
    }

    componentDidMount() {
        this.loadParent();
    }

    loadParent = () => {
        let component  = this;
        axios.get('http://localhost:8080/users/PARENT/' + this.props.match.params.id)
            .then(function (response) {
                component.setState({
                    parent: response.data,
                    parentInfoLoaded: true
                });
            })
        axios.get('http://localhost:8080/childs?parentId=' + this.props.match.params.id)
            .then(function (response) {
                component.setState({
                    children: response.data,
                    childrenInfoLoaded: true
                });
            })
    }

    render() {
        return (
            <div id="component_root">
                <NavBar/>
                <div class="row page_label">
                    <span class="display-4">Parent Information</span>
                </div>
                {this.state.parentInfoLoaded && this.state.childrenInfoLoaded
                    ?
                        <div class="row col-12">
                            <div class="row col-12">
                                <Link  class="btn btn-info" to={{
                                    pathname:'/createChild',
                                    state : {
                                        user: this.state.user,
                                        parent: this.state.parent
                                    }
                                }}>Create Child </Link>
                            </div>

                            <div class="row col-12">
                                <h5 class="display-5 top-spacer-10">Info</h5>
                                <div class="row col-12">
                                    <span class="col-6">Name</span>
                                    <span class="col-6">{this.state.parent.firstName} {this.state.parent.lastName}</span>
                                </div>
                                <div class="row col-12">
                                    <span class="col-6">Phone number</span>
                                    <span class="col-6">{this.state.parent.phoneNumber}</span>
                                </div>
                            </div>

                            <div class="row col-12">
                                <ChildList children={this.state.children}/>
                            </div>
                        </div>
                    : renderLoadWait()
                }
            </div>
        );
 	}
}