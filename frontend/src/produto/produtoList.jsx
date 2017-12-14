import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { getList } from './produtoActions'

class ProdutoList extends Component {
    componentWillMount() {
        this.props.getList()
    }

    renderRows() {
        const list = this.props.list || []
        return list.map(p => (
            <tr key={p.id}>
                <td>{p.nome}</td>
                <td>{p.preco}</td>
                <td>
                    <button className="btn btn-warning" >
                        <i className="fa fa-pencil"></i>
                    </button>
                    <button className="btn btn-danger" >
                        <i className="fa fa-trash-o"></i>
                    </button>
                </td>
            </tr>
        ))
    }

    render() {
        return (
            <div>
                <table className="table">
                    <thead>
                        <tr >
                            <th>Nome</th>
                            <th>Preço</th>
                            <th className='table-actions'>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderRows()}
                    </tbody>
                </table>
            </div>
        )
    }
}

const mapStateToProps = state => ({ list: state.produto.list })

const mapDispatchToProps = dispatch => bindActionCreators({ getList }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ProdutoList)