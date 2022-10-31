import React, { Component } from 'react'

// export class Hero extends Component {
//     constructor(props) {
//         super(props)
//     }

//     componentDidMount() {
//         if (this.props.hero === 'joker') {
//             throw new Error('Not a Hero !!')
//         }
//     }

//     render() {
//         return (
//             <div>{this.props.hero}</div>
//         )
//     }
// }

function Hero({ hero }) {
    if (hero === 'joker') {
        throw new Error('Not a Hero !!')

    }
    return (
        <div>{hero}</div>
    )
}

export default Hero