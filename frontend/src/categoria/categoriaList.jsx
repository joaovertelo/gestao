import React, { PropTypes } from 'react';


const List = ({ categoria, deleteCategoria }) => (
    <table className='table table-striped table-bordered'>
        <thead>
            <tr>
                <th>Nome</th>
                <th className='table-actions'>ACTIONS</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>{categoria.nome}</td>
                <td>
                    <button className="btn btn-info" onClick={() => this.props.visualizar(c)} >
                        <i className="fa fa-eye"></i>
                    </button>
                    <button className="btn btn-warning" onClick=''>
                        <i className="fa fa-pencil"></i>
                    </button>
                    <button className="btn btn-danger" onClick=''>
                        <i className="fa fa-trash-o"></i>
                    </button>
                </td>
            </tr>
        </tbody>
    </table>
);

export default List;