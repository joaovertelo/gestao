import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { handleChange } from './categoriaActions'

import InputLabel from '../common/form/inputLabel'

class Form extends Component {
    constructor(props) {
        super(props)
        this.onChange = this.onChange.bind(this)
        this.state = {
            categoria: this.props.categoria || { nome: '' }
        }

    }

    onChange(e) {
        this.setState({ categoria: { ...this.props.categoria, [e.target.name]: e.target.value } })
        this.props.handleChange(this.state.categoria)
    }

    onSubmit(e) {
        e.preventDefault()
        this.props.handleSubmit(this.state.categoria)
    }

    render() {

        return (
            <form onSubmit={this.onSubmit.bind(this)}>
                <div className="panel panel-default">
                    <div className="panel-body">
                        <InputLabel onChange={this.onChange} name='nome' label='Nome' value={this.state.categoria.nome}
                            type='text' placeholder='Nome...' />
                    </div>
                    <div className="panel-footer">
                        <button type="submit" className='btn btn-primary' > Salvar</button>
                        <button type="button" onClick={this.props.cancelForm} className='btn btn-danger'> Cancelar </button>
                    </div>
                </div>
            </form>
        );
    }
}


const mapStateToProps = state => ({
    categoria: state.categoria.categoria
});

const mapDispatchToProps = dispatch => bindActionCreators({ handleChange }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Form)