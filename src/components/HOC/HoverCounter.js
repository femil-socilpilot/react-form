import React, { Component } from 'react'
import withCounter from './withCounter'

class HoverCounter extends Component {

    render() {
        const { count, clickHandler } = this.props
        return (
            <h1 onMouseOver={clickHandler}>You hover me {count} Times</h1>
        )
    }
}

export default withCounter(HoverCounter, 1)