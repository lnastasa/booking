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
            classEmpty: false,

            createFailed: false,

            childrenInClass: []
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount() {
        this.loadTeachers();
        this.loadChildren();
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

    loadChildren = () => {
     let component  = this;
     axios.get('http://localhost:8080/childs?parentId=0')
        .then(function (response) {
                component.setState({
                    childList: response.data,
                    childrenLoaded: true
                });
            })
    }

    handleSubmit(event) {
        event.preventDefault();

        var childList = this.state.childrenInClass.filter(function (el) {
          return el != null;
        }).map(function (e2) {
          return Number(e2);
        });

        if (this.state.name === '') {
            this.setState({nameEmpty: true});
        } else {
            this.setState({nameEmpty: false});
        }

        if (this.state.teacherId === '') {
            this.setState({teacherNotSelected: true});
        } else {
            this.setState({teacherNotSelected: false});
        }

        if (childList.length === 0) {
            this.setState({classEmpty: true});
        } else {
            this.setState({classEmpty: false});
        }

        if (this.state.nameEmpty === false
            && this.state.teacherNotSelected === false
            && this.state.classEmpty === false) {
            axios.post('http://localhost:8080/classes',
            {
                name: this.state.name,
                teacherId: this.state.teacherId,
                childIds: childList
            })
            .then(response => {
               this.props.history.push({
                  pathname:'/admin/',
                  state : {
                    message: 'Class created successfully'
                  }
               })
            }).catch(error => {
                this.setState({createFailed: true});
            });
        }
    }

    handleInputChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleRadioInputChange(event) {
        if (this.state.childrenInClass.includes(event.target.value)) {
            delete this.state.childrenInClass[this.state.childrenInClass.indexOf(event.target.value)]
        } else {
            this.state.childrenInClass.push(event.target.value)
        }
    }

     render() {
        return (
            <div>
                <div>Create Class</div>
                <div>
                    { this.state.teachersLoaded && this.state.childrenLoaded
                    ?
                   <div>
                       {this.state.createFailed
                              ? <div>Unable to create class</div>
                              : null
                        }
                        {this.state.nameEmpty
                            ? <div>Name must not be empty</div>
                            : null
                        }
                        {this.state.teacherNotSelected
                            ? <div>A teacher must be selected</div>
                            : null
                        }
                        {this.state.classEmpty
                            ? <div>Please add children to the class</div>
                            : null
                        }s

                        <form onSubmit={this.handleSubmit}>
                            <label>Class Name:
                                <input type="text" name="name" onChange={this.handleInputChange} />
                            </label>
                            <label>Teacher:
                                <select name="teacherId" onChange={this.handleInputChange} >
                                    <option selected disabled> Please Select a teacher</option>
                                    {this.state.teacherList.map(function (teacher, index) {
                                        return <option value={teacher.id}>{teacher.firstName} {teacher.lastName}</option>
                                    })}
                                </select>
                            </label>
                            Children:
                                {this.state.childList.map(function (child, index) {
                                    return <label><input type="checkbox" name="child.{child.id}" value={child.id} onChange={this.handleRadioInputChange.bind(this)} />{child.firstName} {child.lastName} <br/></label>;
                                }, this)}
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