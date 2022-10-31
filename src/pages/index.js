import React, { Component } from 'react'
import { Navigate } from 'react-router-dom'
import Navbar from '../components/common/Navbar'

export class index extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: JSON.parse(localStorage.getItem('profile')) ?? null
        }
    }


    render() {
        const { user } = this.state
        return (
            <div>
                {!user &&
                    <Navigate to="/signin" replace={true} />
                }

                <div>Home</div>
            </div>
        )
    }
}

export default index