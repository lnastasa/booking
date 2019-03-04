import React, { Component } from 'react';
import ClassList from '../classes/ClassList'
import axios from 'axios'

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
            <div>
                <span>My Classes</span>
                {this.state.classesLoaded
                    ?
                        <div>
                            <ClassList classes={this.state.classes}/>
                        </div>
                    : <div>'Loading ....'</div>
                }
            </div>
        );
  }
}