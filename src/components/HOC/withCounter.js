import { Component } from "react"
import React from 'react'

const withCounter = (WrappedComponent, incrementNum) => {
    class WithCounter extends Component {
        // constructor(props) {
        //     super(props)

        //     this.state = {
        //         count: 0
        //     }
        // }
        state = {
            count: 0

        }
        clickHandler = () => {
            this.setState(prevState => {
                return { count: prevState.count + incrementNum }
            })
        }
        render() {
            return (
                <WrappedComponent
                    count={this.state.count}
                    clickHandler={this.clickHandler}
                    {...this.props}
                />
            )
        }
    }

    return WithCounter

}
export default withCounter