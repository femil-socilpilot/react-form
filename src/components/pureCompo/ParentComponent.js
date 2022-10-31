import React, { Component, PureComponent } from 'react'
import RegularComponent from './RegularComponent'
import PureComponetFile from './PureComponet'

// class ParentComponent extends PureComponent {
class ParentComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "femil",
            obj: {
                id: 0
            }
        }
    }

    componentDidMount() {
        setInterval(() => {
            this.setState({
                // ...this.state,
                // obj: {
                //     ...this.state.obj,
                //     id: 1
                // }


                name: 'femsdsdil'
            })
        }, 3000)
    }

    render() {
        console.log('**********ParentComponent**********');
        return (
            <div>
                Parent Component
                <RegularComponent name={this.state.name} />
                <PureComponetFile name={this.state.name} />
            </div>
        )
    }
}

export default ParentComponent