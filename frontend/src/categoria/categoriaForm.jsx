import React, { PropTypes } from 'react';

const Form = ({ categoria, handleSubmit, cancelForm }) => (
    <form onSubmit={handleSubmit}>
        <input type="text" id="nome" placeholder="Nome da categoria..." defaultValue={categoria.nome} />
        <input type="submit" value="SUBMIT" />
        <input type="button" value="CANCEL" onClick={cancelForm} />
    </form>
);

Form.propTypes = {
    cancelForm: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    categoria: PropTypes.object.isRequired,
};

export default Form;