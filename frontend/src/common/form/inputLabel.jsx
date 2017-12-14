import React, { Component } from 'react'

class InputLabel extends Component {
    constructor(props) {
        super(props)
        //this.onChange = this.onChange.bind(this)
        // this.state = { value: this.props.value }
    }

    // onChange(e) {
    //     this.setState({ value: e.target.value })
    //     this.props.onChange(e.target.name, e.target.value)
    // }

    render() {
        return (
            <div className="form-group">
                <label htmlFor={this.props.name} >{this.props.label}</label>
                <input value={this.props.categoria} onChange={this.props.onChange} name={this.props.name} type={this.props.type}
                    placeholder={this.props.placeholder} className='form-control' />
            </div>
        );
    }
}
const mapStateToProps = state => ({ categoria: state.categoria.categoria })
export default InputLabel
