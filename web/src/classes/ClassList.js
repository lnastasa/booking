import React, { Component } from 'react';
import ClassListItem from './ClassListItem';

export default class ClassList extends Component {

    render() {
        return (
            <div class="row col-12">
                {
                    this.props.classes.length === 0
                    ?
                        <div class="col-6 col-offset-2 alert alert-warning" role="alert">Class list is empty</div>
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