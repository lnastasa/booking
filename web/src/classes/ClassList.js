import React, { Component } from 'react';
import ClassListItem from './ClassListItem';

export default class ClassList extends Component {

    render() {
        return (
            <div>
                {
                    this.props.classes.length === 0
                    ?
                        <span>Class list is empty</span>
                    :
                        <ul>
                            {
                                this.props.classes.map(function (clazz, index) {
                                    return <li>
                                        <ClassListItem class={clazz}/>
                                    </li>;
                                })
                            }
                        </ul>
                }
            </div>
        );
    }
}