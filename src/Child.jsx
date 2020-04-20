import React, { Component } from 'react'
export default class Child extends Component {

    render() {
        let changeMsg = this.props.fn
        return (

            <div>
                <p>Child组件</p>
                <p>Child组件的属性:{this.props.msg1}</p>
                <button onClick={() => changeMsg()}>点击改变父组件的状态</button>
            </div>
        )
    }


}