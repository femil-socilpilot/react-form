import React, { Component } from 'react'

export class ErrorBoundary extends Component {
    constructor(props) {
        super(props)

        this.state = {
            hasError: false
        }
    }

    static getDerivedStateFromError() {
        return {
            hasError: true
        }
    }

    componentDidCatch(err, info) {
        console.log(err, info);
    }

    render() {
        if (this.state.hasError) {
            return <h1>Something went wrong!</h1>
        }

        return this.props.children
    }
}

export default ErrorBoundary