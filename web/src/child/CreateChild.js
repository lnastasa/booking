import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import axios from 'axios'
import "react-datepicker/dist/react-datepicker.css";

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
            dateOfBirthEmpty: false,

            createFailed: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();

        if (this.state.firstName === undefined) {
            this.setState({firstNameEmpty: true});
        } else {
            this.setState({firstNameEmpty: false});
        }

        if (this.state.lastName === undefined) {
            this.setState({lastNameEmpty: true});
        } else {
            this.setState({lastNameEmpty: false});
        }

        if (this.state.dateOfBirth === undefined) {
            this.setState({dateOfBirthEmpty: true});
        } else {
            this.setState({dateOfBirthEmpty: false});
        }

        if (this.state.firstName !== undefined
                    && this.state.lastName !== undefined
                    && this.state.dateOfBirth !== undefined) {
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
            <div>
                <div>Create Child for {this.state.parent.firstName} {this.state.parent.lastName}</div>

                {this.state.firstNameEmpty
                    ? <div>First Name must not be empty</div>
                    : null
                }
                {this.state.lastNameEmpty
                    ? <div>Last Name must not be empty</div>
                    : null
                }
                {this.state.dateOfBirthEmpty
                    ? <div>Date of Birth must not be empty</div>
                    : null
                }
                {this.state.createFailed
                    ? <div>Unable to create child</div>
                    : null
                }

                <form onSubmit={this.handleSubmit}>
                    <label>First Name:
                        <input type="text" name="firstName" onChange={this.handleInputChange} />
                    </label>
                     <label>Last Name:
                        <input type="text" name="lastName" onChange={this.handleInputChange} />
                    </label>
                    <label>Date of Birth:
                        <DatePicker
                                selected={this.state.dateOfBirthObject}
                                onChange={this.handleChangeDate}
                              />
                    </label>
                  <input type="submit" value="Create"  />
                </form>
            </div>
        )
    }
}
