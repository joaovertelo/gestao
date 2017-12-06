import React, { Component } from 'react'

class ClienteList extends Component {

    renderRows() {
        return (
            <tbody>
                <tr>
                    <td>João Marcos</td>
                    <td>13/09/1993</td>
                    <td>(31)99308-2672</td>
                    <td>
                        <button className="btn btn-info" onClick='' >
                            <i className="fa fa-eye"></i>
                        </button>
                        <button className="btn btn-warning" onClick=''>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger" onClick=''>
                            <i className="fa fa-trash-o"></i>
                        </button>
                    </td>
                </tr >
                <tr>
                    <td>João Marcos</td>
                    <td>13/09/1993</td>
                    <td>(31)99308-2672</td>
                    <td>
                        <button className="btn btn-info" onClick='' >
                            <i className="fa fa-eye"></i>
                        </button>
                        <button className="btn btn-warning" onClick=''>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger" onClick=''>
                            <i className="fa fa-trash-o"></i>
                        </button>
                    </td>
                </tr >
            </tbody>
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
                    {this.renderRows()}
                </table>
            </div>
        )
    }
}

export default ClienteList