import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { handleChange, cancel } from './produtoActions'
import { getList as getListCategoria } from '../categoria/categoriaActions'

import InputLabel from '../common/form/inputLabel'

class Form extends Component {
    constructor(props) {
        super(props)
        this.onChange = this.onChange.bind(this)
        this.state = {
            produto: this.props.produto,
            listCategorias: this.props.listCategorias || []
        }
    }

    componentWillMount() {
        this.props.getListCategoria()
    }

    onChange(e) {
        this.setState({ produto: { ...this.state.produto, [e.target.name]: e.target.value } })
        console.log('produto', this.state.produto)
        //this.props.handleChange(this.state.produto)
    }

    onSubmit(e) {
        e.preventDefault()

        if (this.props.novo) {
            this.props.submitCreate(this.state.produto)
        } else {
            this.props.submitUpdate(this.state.produto)
        }
    }

    carregarCategorias() {
        const listCategorias = this.props.listCategorias || []
        return listCategorias.map(
            c => (
                <option value={c.id} key={c.id} > {c.id} - {c.nome} </option>
            )
        )
    }

    render() {
        const listCategorias = this.props.listCategorias
        return (
            <form onSubmit={this.onSubmit.bind(this)}>
                <div className="panel panel-default">
                    <div className="panel-body">
                        <InputLabel onChange={this.onChange} name='nome' label='Nome' value={this.state.produto.nome}
                            type='text' placeholder='Nome...' readOnly={this.props.readOnly} />
                        <InputLabel onChange={this.onChange} name='preco' label='Preço' value={this.state.produto.preco}
                            type='number' placeholder='Preço...' readOnly={this.props.readOnly} />
                        <div className="form-group ">
                            <label htmlFor="categoria">Categoria:</label>
                            <select value={this.state.produto.categoria} onChange={this.onChange} className="form-control" name="categoria" disabled={this.props.readOnly}>
                                {this.carregarCategorias()}
                            </select>
                        </div>
                    </div>
                    <div className="panel-footer">
                        <button disabled={this.props.readOnly} type="submit" className='btn btn-primary' > Salvar</button>
                        <button type="button" onClick={this.props.cancel} className='btn btn-danger'> Cancelar </button>
                    </div>
                </div>
            </form>
        );
    }
}


const mapStateToProps = state => ({
    produto: state.produto.produto,
    listCategorias: state.categoria.list,
    novo: state.produto.novo,
    readOnly: state.produto.readOnly
});

const mapDispatchToProps = dispatch => bindActionCreators({ handleChange, cancel, getListCategoria }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Form)