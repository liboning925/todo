import React, { Component } from 'react'
export default class Item extends Component {
    constructor() {
        super();
        this.state = {
            inEdit: false,//是否进入编辑状态
            flag: true

        }
        this.haddleEdit = this.haddleEdit.bind(this);
    }
    haddleEdit() {
        let { todo } = this.props
        this.setState({ inEdit: true }, () => {
            this.refs.myInput.value = todo.value;
            this.refs.myInput.focus();
        })

    }
    render() {
        let { todo, deleteTodo, changeHasCompleted, editTodo } = this.props;
        let { inEdit, flag } = this.state;
        let completed = todo.hasCompleted ? "completed" : "";
        let className = inEdit ? completed + " editing" : completed;
        return (
            <li className={className}>
                <div className="view">
                    <input type="checkbox" className="toggle" onChange={() => changeHasCompleted(todo)}
                        checked={todo.hasCompleted}
                    ></input>
                    <label onDoubleClick={this.haddleEdit}>{todo.value}</label>
                    <button className="destroy" onClick={() => deleteTodo(todo)}></button>
                </div>
                <input type="text" className="edit" ref="myInput"
                    onBlur={
                        e => {
                            if (flag) {
                                todo.value = e.target.value.trim();
                                editTodo(todo);
                                this.setState({
                                    inEdit: false
                                })
                            }
                        }
                    }
                    onKeyUp={
                        e => {
                            if (e.keyCode !== 13 && e.keyCode !== 27) return;

                            if (e.keyCode === 13) {
                                todo.value = e.target.value.trim();
                                editTodo(todo);
                                this.setState({
                                    inEdit: false
                                })

                            }
                            if (e.keyCode === 27) {
                                editTodo(todo);
                                this.setState({
                                    inEdit: false,
                                    flag: false
                                }, () => {
                                    setTimeout(() => {
                                        this.setState({ flag: true })
                                    }, 10)
                                })
                            }
                        }
                    }
                ></input>
            </li>
        )
    }
}