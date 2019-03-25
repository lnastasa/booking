import React, { Component } from 'react';
import ClassList from '../classes/ClassList'
import axios from 'axios'
import renderLoadWait from '../common/loadUtil';
import NavBar from '../common/navbar'

export default class TeacherHome extends Component {

    constructor(props) {
        super(props);
        this.state = {
            classesLoaded : false,
            user: window.store.getState().user
        };
    }

    componentDidMount() {
        this.loadInfo();
    }

     loadInfo = () => {
        let component  = this;
        axios.get('http://localhost:8080/classes/teacher/' + this.state.user.id)
        .then(function (response) {
            component.setState({
                classes: response.data,
                classesLoaded: true
            })
        });
     }

    render() {
        return (
            <div id="component_root" class="col-12">
                <NavBar/>

                <div class="row page_label">
                    <span class="row col-12 display-4">Teacher Home</span>
                </div>
                <div class="row top-spacer-10">
                    <h4>Classes</h4>
                </div>

                <div class="row">
                    <div class="col-8">
                        {this.state.classesLoaded
                            ? <ClassList classes={this.state.classes}/>
                            : renderLoadWait()
                        }
                    </div>
                </div>
            </div>
        );
  }
}