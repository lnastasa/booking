import React, { Component } from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom';
import ChildList from '../child/ChildList'

export default class ParentInfo extends Component {

    mixins: [Navigation];

	constructor(props) {
        super(props);

        this.state = {
            parentInfoLoaded : false,
            childrenInfoLoaded : false,

            user: this.props.location.state.user
        };
    }

    componentDidMount() {
        this.loadParent();
    }

    loadParent = () => {
        let component  = this;
        axios.get('http://localhost:8080/users/PARENT/' + this.props.match.params.id)
            .then(function (response) {
                component.setState({
                    parent: response.data,
                    parentInfoLoaded: true
                });
            })
        axios.get('http://localhost:8080/childs?parentId=' + this.props.match.params.id)
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
            	<div>Parent Information</div>
                {this.state.parentInfoLoaded
                    ?
                        <div>
                            <div>
                                <div>{this.state.parent.firstName} {this.state.parent.lastName}</div>
                            </div>
                            <Link to={{
                                pathname:'/createChild',
                                    state : {
                                        user: this.state.user,
                                        parent: this.state.parent
                                    }
                             }}>Create Child </Link>
                        </div>
                    : <div>'Loading ....'</div>
                }
                {this.state.childrenInfoLoaded
                    ?
                      <ChildList children={this.state.children}/>
                    : <div>'Loading ....'</div>
                }
            </div>
        );
 	}
}