import React, { Component } from 'react';
import axios from 'axios'

export default class ClassInfo extends Component {

	constructor(props) {
        super(props);

        this.state = {
            classLoaded : false,
            teacherLoaded : false
        };
    }

    componentDidMount() {
        this.loadClass();
    }

    loadClass = () => {
        let component  = this;
        axios.get('http://localhost:8080/classes/' + this.props.match.params.id)
        .then(function (response) {
            component.setState({
                class: response.data,
                classLoaded: true
            })

            axios.get('http://localhost:8080/users/TEACHER/' + response.data.teacherId)
            .then(function (response) {
             component.setState({
                 teacher: response.data,
                 teacherLoaded: true
            })
            })
        });
    }

    render() {
        return (
            <div>
            	<div>Class Info</div>
                {this.state.classLoaded && this.state.teacherLoaded
                    ?
                        <div>
                            <div>Name : &nbsp; {this.state.class.name}</div>
                            <div>Teacher : &nbsp; {this.state.teacher.firstName} {this.state.teacher.lastName}</div>
                        </div>
                    : <div>'Loading ....'</div>
                }
            </div>
        );
 	}
}