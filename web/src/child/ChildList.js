import React, { Component } from 'react';
import ChildListItem from './ChildListItem';

export default class ChildList extends Component {

    render() {
        return (
            <div>
                {
                    this.props.children.length === 0
                    ?
                        null
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