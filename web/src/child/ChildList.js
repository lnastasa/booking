import React, { Component } from 'react';
import ChildListItem from './ChildListItem';

export default class ChildList extends Component {

    constructor(props) {
        super(props)

        this.state = {
            renderDeleteButtons : this.props.renderDeleteButtons,
            classId : this.props.classId,
            children : this.props.children
        };
    }

    render() {
        return (
            <div class="row col-12">
                <h5 class="display-5 top-spacer-10">Children</h5>
                {
                    this.state.children.length === 0
                    ?
                        <div class="col-6 col-offset-2 alert alert-warning" role="alert">No children in list</div>
                    :
                        <div class="row col-12">
                            {
                                this.state.children.map(function (child, index) {
                                    return <ChildListItem child={child}/>
                                }, this)
                            }
                        </div>
                }
            </div>
        );
    }
}