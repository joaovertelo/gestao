import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { visualizar, editar, deleteCategoria } from './categoriaActions'

class CategoriaList extends Component {

    renderRows() {
        const list = this.props.list || []
        return list.map(c => (
            <tr key={c.id}>
                <td>{c.nome}</td>
                <td>
                    <button className="btn btn-info" onClick={() => this.props.visualizar(c)} >
                        <i className="fa fa-eye"></i>
                    </button>
                    <button className="btn btn-warning" onClick={() => this.props.editar(c)}>
                        <i className="fa fa-pencil"></i>
                    </button>
                    <button className="btn btn-danger" onClick={() => this.props.deleteCategoria(c.id)}>
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

const mapStateToProps = state => ({ list: state.categoria.list })

const mapDispatchToProps = dispatch => bindActionCreators({ visualizar, editar, deleteCategoria }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(CategoriaList)