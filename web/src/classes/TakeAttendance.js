import React, { Component } from 'react';
import axios from 'axios'

export default class TakeAttendance extends Component {

    constructor(props) {
        super(props);

         this.state = {
             childrenLoaded : false,
             attendanceReport : []
         };
     }

    componentDidMount() {
         this.loadInfo();
    }

    toggleAttendance = () => {
        alert('test');
     }

     loadInfo = () => {
        let component  = this;
        axios.get('http://localhost:8080/classes/' + component.props.match.params.id + '/children')
        .then(function (response) {
             component.setState({
                 children: response.data,
                 childrenLoaded: true
            })
            component.state.children.map(function (child, index) {
                return component.state.attendanceReport.push(
                    {
                       childId: child.id,
                       present: true
                    }
                )
            });
        })
    };

    render() {
        return (
            <div>
                <span>Take attendance</span>

                 {
                    this.state.childrenLoaded
                    ?
                        this.state.children.map(function (child, index) {
                            return <li>
                                <span onClick={this.toggleAttendance.bind(this, child.id)}>{child.firstName} {child.lastName}</span>
                            </li>
                        })
                    :
                        null
                 }
            </div>
        )
    }
}
