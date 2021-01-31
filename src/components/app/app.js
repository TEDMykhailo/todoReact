import React, {Component} from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from "../item-add-form";

import './app.css';

export default class App extends Component {

    id = 0;

    state = {
        todoData: [
            this.createTodoItem('Drink Coffee'),
            this.createTodoItem('Make Awesome App'),
            this.createTodoItem('Have a lunch'),
        ],
        term: '',
        filter: 'all',
    };

    createTodoItem(label) {
        return {
            label,
            important: false,
            done: false,
            id: this.id++
        }
    };

    toggleProperty(id, propName) {
        this.setState(({todoData}) => {
            const inx = todoData.findIndex((el) => el.id === id);
            const item = Object.assign(todoData[inx]);
            item[propName] = !item[propName];

            return {...todoData.slice(inx), item, ...todoData.slice(inx + 1)};
        })
    }

    deleteItem = (id) => {
        this.setState(({todoData}) => {
            const newArr = todoData.filter((el) => el.id !== id);

            return {
                todoData: newArr
            };
        })
    }

    addItem = (text) => {
        this.setState(({todoData}) => {
            const a = todoData
            a.push(this.createTodoItem(text));

            return {
                todoData: a
            };

        })
    }

    onToggleImportant = (id) => {
        this.toggleProperty(id, 'important')
    }

    onToggleDone = (id) => {
        this.toggleProperty(id, 'done')
    }

    filter = (items, filter) => {
        switch (filter) {
            case 'all' : return items;
            case 'active' : return items.filter((el) => !el.done);
            case 'done' : return items.filter((el) => el.done);
            default: return items;
        }
    }

    search= (items, term) => {
        if(term.label === 0) {
            return items;
        }

        return items.filter((el) => {
            return el.label.toLowerCase().indexOf(term.toLowerCase()) > -1
        })
    }

    onSearchChange = (term) => {
        this.setState({term})
    }

    onFilterChange = (filter) => {
        this.setState({filter})
    }

    render() {
        const visibleItems = this.filter(
            this.search(this.state.todoData, this.state.term) , this.state.filter);

        const doneCount = this.state.todoData.filter((el) => el.done).length;
        const todoCount = this.state.todoData.length - doneCount;

        return (
            <div className="todo-app">
                <AppHeader toDo={todoCount} done={doneCount}/>
                <div className="top-panel d-flex">
                    <SearchPanel onSearchChange={this.onSearchChange}/>
                    <ItemStatusFilter
                        filter = {this.state.filter}
                        onFilterChange = {this.onFilterChange}
                    />
                </div>

                <TodoList
                    active = {this.state.active}
                    todos={visibleItems}
                    onDeleted={(id) => this.deleteItem(id)}
                    onToggleImportant={(id) => this.onToggleImportant(id)}
                    onToggleDone={(id) => this.onToggleDone(id)}
                />

                <ItemAddForm
                    onItemAdded={this.addItem}
                />
            </div>
        );
    };
}
