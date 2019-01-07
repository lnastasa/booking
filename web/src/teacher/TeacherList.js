import React, { Component } from 'react';
import axios from 'axios'
import TeacherListItem from './TeacherListItem';

export default class TeacherList extends Component {

    constructor(props) {
        super(props);

        this.state = {componentLoaded : false};
    }

    componentDidMount() {
        this.loadTeachers();
    }

    loadTeachers = () => {
        let component  = this;
        axios.get('http://localhost:8080/users/TEACHER')
        .then(function (response) {
            component.setState({
                teacherList: response.data,
                componentLoaded: true
            });
        })
    }

    render() {
        return (
            <div>Teacher List

            {this.state.componentLoaded
                ? <ul>
                    {
                        this.state.teacherList.map(function (teacher, index) {
                            <li>
                                <TeacherListItem />
                            </li>
                        })
                    }
                </ul>
                : <div>'Loading ....'</div>
            }

            <TeacherListItem />

            </div>
        );
  }
}