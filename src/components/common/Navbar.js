import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export class Navbar extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }
    render() {
        return (
            <div className='nav'>
                <div>Logo</div>
                <div>
                    <Link to={'/'}>Home</Link>
                    <Link to={'/signup'}>SignUp</Link>
                    <Link to={'/signin'}>SignIn</Link>
                </div>
            </div>
        )
    }
}

export default Navbar