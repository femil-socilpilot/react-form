import React, { Component } from 'react'

class RegularComponent extends Component {
    // shouldComponentUpdate() {
    //     return false
    // }
    render() {
        console.log('*****RegularComponent*****');
        return (
            <div>RegularComponent {this.props.name}</div>
        )
    }
}

export default RegularComponent