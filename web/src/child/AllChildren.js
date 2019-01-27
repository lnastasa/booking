import React, { Component } from 'react';
import axios from 'axios'
import ChildList from '../child/ChildList'

export default class ParentInfo extends Component {

    constructor(props) {
        super(props);

        this.state = {
            childrenInfoLoaded : false
        };
    }

    componentDidMount() {
        this.loadChildren();
    }

    loadChildren = () => {
        let component  = this;
        axios.get('http://localhost:8080/childs?parentId=0')
            .then(function (response) {
                component.setState({
                    children: response.data,
                    childrenInfoLoaded: true
                });
            })
    }

    render() {
        return (
            <div>
                {this.state.childrenInfoLoaded
                    ?
                      <ChildList children={this.state.children}/>
                    : <div>'Loading ....'</div>
                }
            </div>
        );
    }
}