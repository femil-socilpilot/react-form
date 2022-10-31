import React, { PureComponent } from 'react'

class PureComponetFile extends PureComponent {
    render() {
        console.log('*****PureComponetFile*****');
        return (
            <div>PureComponet {this.props.name}</div>
        )
    }
}

export default PureComponetFile
