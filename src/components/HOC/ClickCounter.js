import React, { Component } from 'react'
import withCounter from './withCounter'

class ClickCounter extends Component {

    render() {
        const { count, clickHandler } = this.props
        return (
            <button onClick={clickHandler}>"{this.props.name}" You click me {count} Times</button>
        )
    }
}

export default withCounter(ClickCounter, 5)