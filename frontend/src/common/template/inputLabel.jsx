import React, { Component } from 'react'



class InputLabel extends Component {
    constructor(props) {
        super(props)
    }


    render() {
        return (
            <div className="form-group">
                <label htmlFor={this.props.name} >{this.props.label}</label>
                <input type={this.props.type} name={this.props.name}
                    placeholder={this.props.placeholder} className='form-control' />
            </div>
        );
    }
}

