import React, { Component } from 'react';
import ChildListItem from './ChildListItem';

export default class ChildList extends Component {

    render() {
        return (
            <div class="row">
                {
                    this.props.children.length === 0
                    ?
                        <div class="col-6 col-offset-2 alert alert-warning" role="alert">No children in list</div>
                    :
                        <ul>
                            {
                                this.props.children.map(function (child, index) {
                                    return <li>
                                        <ChildListItem child={child}/>
                                    </li>;
                                })
                            }
                        </ul>
                }
            </div>
        );
    }
}