import React, { Component } from 'react'

export default class Footer extends Component {
    render() {
        let { todoNum, clearCompleted, view, viewTodo } = this.props
        return (
            <footer className="footer">
                <span className="todo-count">
                    <strong>{todoNum}</strong>
                    <span>{todoNum > 1 ? "items" : "item"}  left</span>
                </span>
                <ul className="filters">
                    <li><a href="#/all" onClick={() => viewTodo('all')} className={view == 'all' ? "selected" : ""}>All</a></li>
                    <li><a href="#/active" onClick={() => viewTodo('active')} className={view == 'active' ? "selected" : ""}>Active</a></li>
                    <li><a href="#/completed" onClick={() => viewTodo('completed')} className={view == 'completed' ? "selected" : ""}>Completed</a></li>
                </ul>
                <button className="clear-completed" onClick={() => clearCompleted()}>clear-completed</button>
            </footer>
        )
    }
}