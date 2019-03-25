import React, { Component } from 'react';
import axios from 'axios'
import renderLoadWait from '../common/loadUtil';
import NavBar from '../common/navbar'

export default class TeacherInfo extends Component {
	
	constructor(props) {
        super(props);

        this.state = {componentLoaded : false};
    }

    componentDidMount() {
        this.loadTeachers();
    }

    loadTeachers = () => {
        let component  = this;
        axios.get('http://localhost:8080/users/TEACHER/' + this.props.match.params.id)
        .then(function (response) {
            component.setState({
                teacher: response.data,
                componentLoaded: true
            });
        })
    }

    render() {
        return (
            <div id="component_root">
                <NavBar/>
                <div class="row page_label">
                    <span class="display-4">Teacher Information</span>
                </div>
                {this.state.componentLoaded
                    ? 
                    	<div class="row col-12">
                            <span class="col-6">Name</span>
                            <span class="col-6">{this.state.teacher.firstName} {this.state.teacher.lastName}</span>
                        </div>
                    : renderLoadWait()
                }
            </div>
        );
 	}
}