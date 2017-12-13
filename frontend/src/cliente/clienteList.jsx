import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { browserHistory, Link } from 'react-router'
import { getList, selectCliente } from './clienteActions'

class ClienteList extends Component {
    constructor(props) {
        super(props)
        this.state = { vizualizar: false, editar: false }
    }

    visualizar(cliente) {
        this.setState({ visualizar: true })
        console.log(this.state)
        this.props.selectCliente(cliente)

    }

    renderRows() {
        const list = this.props.list || []
        return list.map(c => (


            <tr key={c.id}>
                <td>{c.nome}</td>
                <td>{c.dataNasc}</td>
                <td>{c.telefone}</td>
                <td>
                    <Link to='/cliente'>
                        <button className="btn btn-info" onClick={() => this.visualizar(c)} >
                            <i className="fa fa-eye"></i>
                        </button>
                    </Link>
                    <button className="btn btn-warning" onClick=''>
                        <i className="fa fa-pencil"></i>
                    </button>
                    <button className="btn btn-danger" onClick=''>
                        <i className="fa fa-trash-o"></i>
                    </button>
                </td>
            </tr >
        )
        )
    }

    render() {
        return (
            <div>
                <table className='table table-striped table-bordered'>
                    <thead>
                        <tr >
                            <th>Nome</th>
                            <th>Data Nascimento</th>
                            <th>Telefone</th>
                            <th className='table-actions'>Ações</th>
                        </tr>
                    </thead>
                    <tbody>{this.renderRows()}</tbody>
                </table>
            </div>
        )
    }
}


const mapStateToProps = state => ({ list: state.cliente.list })

const mapDispatchToProps = dispatch => bindActionCreators({ getList, selectCliente }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ClienteList)