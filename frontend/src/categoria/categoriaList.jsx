import React, { PropTypes } from 'react';


const List = ({ categoria, renderForm, deleteCategoria }) => (
    <table>
        <thead>
            <tr>
                <td>Nome</td>
                <td>ACTIONS</td>
            </tr>
        </thead>

    </table>
);

List.propTypes = {

    renderForm: PropTypes.func.isRequired,
    deleteCategoria: PropTypes.func.isRequired,
};

export default List;