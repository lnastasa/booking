import React, { Component } from 'react';
import ChildListItem from './ChildListItem';

export default class ChildList extends Component {

    render() {
        return (
            <div class="row col-12">
                <h5 class="display-5 top-spacer-10">Children</h5>
                {
                    this.props.children.length === 0
                    ?
                        <div class="col-6 col-offset-2 alert alert-warning" role="alert">No children in list</div>
                    :
                        <div class="row col-12">
                            {
                                this.props.children.map(function (child, index) {
                                    return <ChildListItem child={child}/>
                                })
                            }
                        </div>
                }
            </div>
        );
    }
}