import React, { Component } from 'react';
import axios from 'axios'

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
            <div>
            	<div>Teacher Info</div>
                {this.state.componentLoaded
                    ? 
                    	<div>
                    		<div>{this.state.teacher.firstName} {this.state.teacher.lastName}</div>
                    	</div>
                    : <div>'Loading ....'</div>
                }
            </div>
        );
 	}
}