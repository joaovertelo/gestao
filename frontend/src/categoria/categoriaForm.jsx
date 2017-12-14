import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { handleChange } from './categoriaActions'

import InputLabel from '../common/form/inputLabel'

class Form extends Component {
    constructor(props) {
        super(props)
        this.onChange = this.onChange.bind(this)

        this.state = { categoria: this.props.categoria || { nome: '' } }

    }

    onChange(e) {
        this.setState({ categoria: { ...this.props.categoria, [e.target.name]: e.target.value } })
        console.log(this.state.categoria)
        this.props.handleChange(this.state.categoria)
    }

    onSubmit(e) {
        e.preventDefault()

        this.props.handleSubmit(this.props.categoria)
    }

    render() {

        return (
            <form onSubmit={this.onSubmit.bind(this)}>
                <InputLabel onChange={this.onChange} name='nome' label='Nome' value={this.state.categoria.nome}
                    type='text' placeholder='Nome...' />
                <input type="submit" value="SUBMIT" />
                <input type="button" value="CANCEL" onClick={this.props.cancelForm} />
            </form>
        );
    }
}


const mapStateToProps = state => ({
    categoria: state.categoria.categoria
});

const mapDispatchToProps = dispatch => bindActionCreators({ handleChange }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Form)