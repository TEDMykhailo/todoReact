import React, {Component} from 'react';

import './item-status-filter.css';

export default class ItemStatusFilter extends Component {
    state = {
        filter: 'all'
    }

    buttons = [
        {name: 'all', label: 'All'},
        {name: 'active', label: 'Active'},
        {name: 'done', label: 'Done'},
    ];

    render() {
        const {filter} = this.props;

        const buttons = this.buttons.map(({name, label}) => {
            const isActive = filter === name;
            const classValue = isActive ? 'btn btn-info' : 'btn btn-light'
            return (
                <button type="button"
                        className={classValue}
                        key={name}
                        onClick={() => this.props.onFilterChange(name)}
                >{label}
                </button>
            )
        })

        return (
            <div className="btn-group">
                {buttons}
            </div>
        );
    }
}
