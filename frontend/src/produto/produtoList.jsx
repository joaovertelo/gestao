import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { visualizar, editar, excluir } from './produtoActions'

class ProdutoList extends Component {

    constructor(props) {
        super(props)
        this.visualizar = this.visualizar.bind(this)
    }

    visualizar(p) {
        this.tratarCategoriaVazio(p)
        this.props.visualizar(p)
    }

    editar(p) {
        this.tratarCategoriaVazio(p)
        this.props.editar(p)
    }

    tratarCategoriaVazio(p) {
        if (p.categoria === null) {
            p.categoria = { id: '' }
        }
    }

    renderRows() {
        const list = this.props.list || []
        return list.map(p => (
            <tr key={p.id}>
                <td>{p.nome}</td>
                <td>
                    <button className="btn btn-info" onClick={() => this.visualizar(p)} >
                        <i className="fa fa-eye"></i>
                    </button>
                    <button className="btn btn-warning" onClick={() => this.editar(p)}>
                        <i className="fa fa-pencil"></i>
                    </button>
                    <button className="btn btn-danger" onClick={() => this.props.excluir(p.id)}>
                        <i className="fa fa-trash-o"></i>
                    </button>
                </td>
            </tr>
        ))
    }

    render() {
        return (
            <table className='table table-striped table-bordered' >
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th className='table-actions'>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        );
    }
}

const mapStateToProps = state => ({ list: state.produto.list })

const mapDispatchToProps = dispatch => bindActionCreators({ visualizar, editar, excluir }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ProdutoList)