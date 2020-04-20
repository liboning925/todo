import React from 'react'
import Item from './Item'
import Footer from './Footer'
export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            todoDatas: [],//储存todo状态
            todoNum: 0,
            flag: false,
            view: 'all'
        }
        this.addTodo = this.addTodo.bind(this);
        this.deleteTodo = this.deleteTodo.bind(this);
        this.changeHasCompleted = this.changeHasCompleted.bind(this);
        this.editTodo = this.editTodo.bind(this)
        this.selectAll = this.selectAll.bind(this);
        this.clearCompleted = this.clearCompleted.bind(this);
        this.viewTodo = this.viewTodo.bind(this)
    }
    //添加todo
    addTodo(e) {
        //如果不是回车键，不添加todo
        if (e.keyCode !== 13) return;
        //如果内容为空不添加todo
        if (e.target.value === "") return false;
        //添加一个todo
        //创建一个空的todo
        let todo = {};
        todo.id = new Date().getTime();
        todo.value = e.target.value.trim();
        todo.hasCompleted = false;
        let { todoDatas, todoNum } = this.state;
        todoDatas.push(todo);
        todoNum++;
        this.setState({ todoDatas, todoNum });
        e.target.value = ""
    }
    //删除todo
    deleteTodo(todo) {
        let { todoDatas, todoNum } = this.state;
        todoDatas = todoDatas.filter(value => {
            if (value.id === todo.id) {
                if (!todo.hasCompleted) {
                    todoNum--;
                }
                return false;
            }
            return true
        })
        this.setState({ todoDatas, todoNum })
    }
    //改变todo的状态
    changeHasCompleted(todo) {
        let { todoDatas, todoNum } = this.state;
        todoDatas = todoDatas.map(value => {
            if (value.id === todo.id) {
                value.hasCompleted = !todo.hasCompleted;
                if (value.hasCompleted) {
                    todoNum--;
                } else {
                    todoNum++;
                }
            }
            return value;

        })
        this.setState({ todoDatas, todoNum })

    }
    //编辑todo
    editTodo(todo) {
        let { todoDatas } = this.state;
        todoDatas = todoDatas.map(value => {
            if (value.id === todo.id) {
                value.value = todo.value;
            }
            return value;
        })
        this.setState({ todoDatas })
    }
    //全选、全不选
    selectAll() {
        let { flag, todoDatas, todoNum } = this.state;
        flag = !flag;
        if (flag) {
            todoDatas = todoDatas.map(value => {
                value.hasCompleted = true;
                return value;
            })
            todoNum = 0;
        } else {
            todoDatas = todoDatas.map(value => {
                value.hasCompleted = false;
                return value;
            })
            todoNum = todoDatas.length
        }
        this.setState({ todoDatas, flag, todoNum })
    }
    //清除已完成的todo
    clearCompleted() {
        let { todoDatas } = this.state;
        todoDatas = todoDatas.filter(value => {
            if (value.hasCompleted) {
                return false;
            }
            return true
        })
        this.setState({ todoDatas })
    }
    //过滤todo
    viewTodo(view) {
        this.setState({ view })
    }
    render() {
        let { todoDatas, todoNum, flag, view } = this.state
        let { deleteTodo, changeHasCompleted, editTodo, selectAll, clearCompleted, viewTodo } = this;
        let filtertodoDatas = todoDatas.filter(value => {
            switch (view) {
                case 'all':
                    return true;
                case 'active':
                    return !value.hasCompleted;
                case 'completed':
                    return value.hasCompleted
            }
        })
        let items = filtertodoDatas.map(todo => {
            return <Item todo={todo} key={todo.id}
                deleteTodo={deleteTodo}
                changeHasCompleted={changeHasCompleted}
                editTodo={editTodo}
            />
        })
        return (
            <section className="todoapp">
                <header className="header">
                    <h1>Todos</h1>
                    <input type="text" className="new-todo" placeholder="What need to be done?" onKeyUp={this.addTodo}></input>
                </header>
                <section className="main">
                    <input type="checkbox" id="toggle-all" className="toggle-all"
                        onChange={selectAll}
                    />
                    <label htmlFor="toggle-all"></label>
                    <ul className="todo-list">
                        {items}
                    </ul>
                </section>
                <Footer todoNum={todoNum}
                    clearCompleted={clearCompleted}
                    view={view}
                    viewTodo={viewTodo}
                />
            </section>
        )
    }
}
