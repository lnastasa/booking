import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import axios from 'axios'
import "react-datepicker/dist/react-datepicker.css";
import NavBar from '../common/navbar'

export default class CreateChild extends Component {

    mixins: [Navigation];

    constructor(props) {
        super(props)
        this.state = {
            parent : this.props.location.state.parent,

            firstName : '',
            lastName: '',
            dateOfBirth: '',
            dateOfBirthObject: new Date(),

            firstNameEmpty: false,
            lastNameEmpty: false,

            createFailed: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();

        if (this.state.firstName === '') {
            this.setState({firstNameEmpty: true});
        } else {
            this.setState({firstNameEmpty: false});
        }

        if (this.state.lastName === '') {
            this.setState({lastNameEmpty: true});
        } else {
            this.setState({lastNameEmpty: false});
        }

        if (this.state.firstName !== ''
                    && this.state.lastName !== '') {
            axios.post('http://localhost:8080/childs',
                {
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    dateOfBirth: this.state.dateOfBirth,
                    parentId: this.state.parent.id
                })
                .then(response => {
                   this.props.history.push({
                      pathname:'/admin',
                      state : {
                        message: 'Child created successfully'
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

    handleChangeDate(date) {
        this.setState({
            dateOfBirthObject: date,
            dateOfBirth: date.getTime() / 1000
        });
    }

    render() {
        return (
            <div id="component_root" class="col-12">
                <NavBar/>
                <div class="row page_label">
                    <span class="display-4">Create Child for {this.state.parent.firstName} {this.state.parent.lastName}</span>
                </div>

                <form onSubmit={this.handleSubmit}>

                    {this.state.firstNameEmpty
                        ? <div class="alert alert-danger col-4" role="alert">First Name must not be empty</div>
                        : null
                    }
                    <div class="row">
                        <label class="col-3">First Name</label>
                        <input class="col-5" type="text" name="firstName" onChange={this.handleInputChange} />
                    </div>

                    {this.state.lastNameEmpty
                        ? <div class="alert alert-danger col-4" role="alert">Last Name must not be empty</div>
                        : null
                    }
                    <div class="row">
                        <label class="col-3">Last Name</label>
                        <input class="col-5" type="text" name="lastName" onChange={this.handleInputChange} />
                    </div>

                    <div class="row">
                        <label class="col-3">Date of Birth</label>
                        <DatePicker class="col-5" selected={this.state.dateOfBirthObject} onChange={this.handleChangeDate}/>
                    </div>

                    {this.state.createFailed
                        ? <div class="alert alert-danger col-4" role="alert">Unable to create child</div>
                        : null
                    }
                    <div class="row">
                        <div class="col-3">&nbsp;</div>
                        <input class="col-2 btn btn-info" type="submit" value="Create" />
                    </div>
                </form>
            </div>
        )
    }
}
