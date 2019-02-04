import React, { Component } from 'react';
import axios from 'axios'
import moment from 'moment'
import {Link} from 'react-router-dom';
import GuardianList from '../guardian/GuardianList';

export default class ChildInfo extends Component {

	constructor(props) {
        super(props);

        this.state = {
            childLoaded : false,
            guardiansLoaded : false
        };
    }

    componentDidMount() {
        this.loadChild();
    }

    loadChild = () => {
        let component  = this;
        axios.get('http://localhost:8080/childs/' + this.props.match.params.id)
        .then(function (response) {
            component.setState({
                child: response.data,
                childLoaded: true
            });
        })
        axios.get('http://localhost:8080/guardians?childId=' + this.props.match.params.id)
        .then(function (response) {
            component.setState({
                guardians: response.data,
                guardiansLoaded: true
            });
        })
    }

    render() {
        return (
            <div>
            	<div>Child Info</div>
                {this.state.childLoaded && this.state.guardiansLoaded
                    ?
                    	<div>
                    		<div>{this.state.child.firstName} {this.state.child.lastName}
                    		    {moment.unix(this.state.child.dateOfBirth).format('DD/MM/YYYY')}
                            </div>
                            <div>
                                <GuardianList guardians={this.state.guardians}/>
                            </div>
                            <div><Link to={{pathname:'/createGuardian',
                                    state : { child: this.state.child }
                                    }}>Add Guardian
                                </Link>
                            </div>
                    	</div>
                    : <div>'Loading ....'</div>
                }
            </div>
        );
 	}
}