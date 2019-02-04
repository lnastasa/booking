import React, { Component } from 'react';
import axios from 'axios'

export default class CreateClass extends Component {

    mixins: [Navigation];

    constructor(props) {
        super(props)
        this.state = {
            name : '',
            teacherId: '',

            nameEmpty: false,
            teacherNotSelected: false,

            createFailed: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
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
                teachersLoaded: true
            });
        })
    }

    handleSubmit(event) {
        event.preventDefault();

        if (this.state.name === '') {
            this.setState({nameEmpty: true});
        } else {
            this.setState({nameEmpty: false});
        }
    }

    handleInputChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

     render() {
        return (
            <div>
                <div>Create Class</div>
                <div>
                    {this.state.teachersLoaded
                    ?
                   <div>
                        {this.state.nameEmpty
                            ? <div>Name must not be empty</div>
                            : null
                        }
                        {this.state.teacherNotSelected
                            ? <div>A teacher must be selected</div>
                            : null
                        }

                        <form onSubmit={this.handleSubmit}>
                            <label>First Name:
                                <input type="text" name="name" onChange={this.handleInputChange} />
                            </label>
                            <label>Teacher:
                                <select name="teacher" onChange={this.handleInputChange} >
                                    {this.state.teacherList.map(function (teacher, index) {
                                        return <option value={teacher.id}>{teacher.firstName} {teacher.lastName}</option>
                                    })}
                                </select>
                            </label>
                            <input type="submit" value="Create"  />
                        </form>
                    </div>
                    :
                    <div>'Loading ....'</div>
                    }
                </div>
            </div>
        )
    }
}