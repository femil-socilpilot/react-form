import React, { Component } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/common/Navbar'

export class index extends Component {
    constructor(props) {
        super(props)

        this.state = {
        }
    }
    render() {
        return (
            <div>
                <Navbar />
                <Outlet />
            </div>
        )
    }
}

export default index