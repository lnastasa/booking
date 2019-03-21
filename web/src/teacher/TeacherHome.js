import React, { Component } from 'react';
import ClassList from '../classes/ClassList'
import axios from 'axios'
import renderLoadWait from '../common/loadUtil';

export default class TeacherHome extends Component {

    constructor(props) {
        super(props);
        this.state = {
            classesLoaded : false,
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
                classes: response.data,
                classesLoaded: true
            })
        });
     }

    render() {
        return (
            <div id="component_root" class="row col-12">
                <div class="row col-12 page_label">
                    <span class="row col-12 display-4">Teacher Home</span>
                </div>
                <div class="row col-12 top-spacer-10">
                    <h4>My Classes</h4>
                </div>
                {this.state.classesLoaded
                    ?
                        <div class="row col-12">
                            <ClassList classes={this.state.classes}/>
                        </div>
                    : renderLoadWait()
                }
            </div>
        );
  }
}