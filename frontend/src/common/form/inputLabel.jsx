import React, { Component } from 'react'

class InputLabel extends Component {
    constructor(props) {
        super(props)

    }

    render() {
        return (
            <div className="form-group">
                <label htmlFor={this.props.name} >{this.props.label}</label>
                <input value={this.props.value} onChange={this.props.onChange} name={this.props.name} type={this.props.type}
                    placeholder={this.props.placeholder} className='form-control' readOnly={this.props.readOnly} />
            </div>
        );
    }
}
export default InputLabel
