import React, { Component } from 'react';
import axios from 'axios'
import NavBar from '../common/navbar'

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
                  pathname:'/administrator',
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
            <div id="component_root" class="col-12">
                <NavBar/>
                <div class="row page_label">
                    <span class="display-4">Create Class</span>
                </div>


                { this.state.teachersLoaded && this.state.childrenLoaded
                ?
                   <form onSubmit={this.handleSubmit}>

                       {this.state.nameEmpty
                           ? <div class="alert alert-danger col-4" role="alert">Name must not be empty</div>
                           : null
                       }
                       <div class="row">
                            <label class="col-3">Class Name</label>
                            <input class="col-5" type="text" name="name" onChange={this.handleInputChange} />
                       </div>

                       {this.state.teacherNotSelected
                           ? <div class="alert alert-danger col-4" role="alert">A teacher must be selected</div>
                           : null
                       }
                       <div class="row">
                            <label class="col-3">Teacher</label>
                            <select class="col-5"  name="teacherId" onChange={this.handleInputChange} >
                                <option selected disabled> Please Select a teacher</option>
                                {this.state.teacherList.map(function (teacher, index) {
                                    return <option value={teacher.id}>{teacher.firstName} {teacher.lastName}</option>
                                })}
                            </select>
                       </div>


                       {this.state.classEmpty
                           ? <div class="alert alert-danger col-4" role="alert">Please add children to the class</div>
                           : null
                       }
                       <div class="row">
                           <label class="col-3">Children</label>
                           <div class="col-5">
                                {this.state.childList.map(function (child, index) {
                                    return <div class="row col-12"><label><input type="checkbox" name="child.{child.id}" value={child.id} onChange={this.handleRadioInputChange.bind(this)} />&nbsp;{child.firstName +' '+child.lastName} </label></div>;
                                }, this)}
                           </div>
                       </div>

                       {this.state.createFailed
                           ? <div class="alert alert-danger col-4" role="alert">Unable to create class</div>
                           : null
                       }
                       <div class="row">
                           <div class="col-3">&nbsp;</div>
                           <input class="col-2 btn btn-info" type="submit" value="Create"/>
                       </div>
                    </form>

                :
                <div>'Loading ....'</div>
                }

            </div>
        )
    }
}