import React, { Component } from 'react';
import axios from 'axios'

export default class ParentInfo extends Component {
	
	constructor(props) {
        super(props);

        this.state = {componentLoaded : false};
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
                componentLoaded: true
            });
        })
    }

    render() {
        return (
            <div>
            	<div>Parent Info</div>
                {this.state.componentLoaded
                    ? 
                    	<div>
                    		<div>{this.state.parent.firstName} {this.state.parent.lastName}</div>
                    	</div>
                    : <div>'Loading ....'</div>
                }
            </div>
        );
 	}
}