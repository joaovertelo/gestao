import React, { Component } from 'react'
import { Link } from 'react-router'

class ButtonLink extends Component {

    render() {


        return (
            <Link to={this.props.path} >
                <button type="button" className={`btn btn-${this.props.type} ${this.props.active} ${this.props.buttonFloatRight}`}>
                    <i className={`fa fa-${this.props.icon}`} ></i>
                    <span className='span-button'>{this.props.label}</span>
                </button >
            </Link>
        )
    }
}

export default ButtonLink