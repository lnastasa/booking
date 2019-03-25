import React, { Component } from 'react';
import axios from "axios/index";
import renderLoadWait from '../common/loadUtil';
import ChildList from '../child/ChildList'
import NavBar from '../common/navbar'

export default class ParentHome extends Component {

    constructor(props) {
        super(props);
        this.state = {
            childrenLoaded : false,
            user: window.store.getState().user
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
            <div id="component_root" class="col-12">
                <NavBar/>
                {
                this.state.childrenLoaded ?
                    <div class="row col-12">
                        <div class="row page_label">
                            <span class="display-4">Parent Home</span>
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