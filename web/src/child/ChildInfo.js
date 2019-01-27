import React, { Component } from 'react';
import axios from 'axios'
import moment from 'moment'

export default class ChildInfo extends Component {

	constructor(props) {
        super(props);

        this.state = {componentLoaded : false};
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
                componentLoaded: true
            });
        })
    }

    render() {
        return (
            <div>
            	<div>Child Info</div>
                {this.state.componentLoaded
                    ?
                    	<div>
                    		<div>{this.state.child.firstName} {this.state.child.lastName}
                    		    {moment.unix(this.state.child.dateOfBirth).format('DD/MM/YYYY')}
                            </div>
                    	</div>
                    : <div>'Loading ....'</div>
                }
            </div>
        );
 	}
}