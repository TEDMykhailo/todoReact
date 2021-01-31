import React, {Component} from 'react';
import './item-add-form.css';

export default class ItemAddForm extends Component {
    state = {
        label: '',
        clazz: 'item-add-form d-flex',
        placeholder: 'What needs to be done'
    };

    onLabelChange = (e) => {
        this.setState({
            label: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        if(this.state.label < 3){
            this.setState({
                clazz: 'item-add-form d-flex inputError',
                label: '',
                placeholder: 'Must be more than three characters'
            })
            return;
        }

        this.props.onItemAdded(this.state.label);
        this.setState({
            clazz: 'item-add-form d-flex',
            label: '',
            placeholder: 'What needs to be done',
        })
    }

    render() {
        return (
            <form className={this.state.clazz} onSubmit={this.onSubmit}>
                <input
                    type="text"
                    className='form-control'
                    onChange={this.onLabelChange}
                    value={this.state.label}
                    placeholder={this.state.placeholder}
                />
                <button
                    className="btn btn-outline-secondary"
                > Add Item
                </button>
            </form>
        );
    };
}
