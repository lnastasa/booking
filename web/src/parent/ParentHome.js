import React, { Component } from 'react';
import axios from "axios/index";
import renderLoadWait from '../common/loadUtil';
import ChildList from '../child/ChildList'

export default class ParentHome extends Component {

    constructor(props) {
        super(props);
        this.state = {
            childrenLoaded : false,
            user: this.props.location.state.user
        };
    }

    componentDidMount() {
        this.loadInfo();
    }

    loadInfo = () => {
        let component  = this;
        axios.get('http://localhost:8080/childs?parentId=' + this.state.user.id)
            .then(function (response) {
                component.setState({
                    children: response.data,
                    childrenLoaded: true
                })
            });
    }

    render() {
        return (
            <div class="row">
            {
                this.state.childrenLoaded ?
                    <div id="component_root" class="row col-12">
                        <div class="row col-12 page_label">
                            <span class="row col-12 display-4">Parent Home</span>
                        </div>
                        <div class="row col-12 top-spacer-10">
                            <h4>My Children</h4>
                        </div>
                        <ChildList children={this.state.children}/>
                    </div>
                :
                    renderLoadWait()
            }
            </div>
        );
  }
}