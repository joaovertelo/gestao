import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Content from '../common/template/content'
import ContentHeader from '../common/template/contentHeader'
import List from './categoriaList'
import { createCategoria, updateCategoria, deleteCategoria } from './categoriaActions'
import Form from './categoriaForm'

class Categoria extends Component {

    constructor(props) {
        super(props);

        this.categoria = null;
        this.state = {
            renderizarForm: false,
            categoria: { nome: 'teste' }
        };

        this.renderForm = this.renderForm.bind(this);
        this.cancelForm = this.cancelForm.bind(this);

        this.createCategoria = this.createCategoria.bind(this);
        this.updateCategoria = this.updateCategoria.bind(this);

        this.deleteCategoria = this.deleteCategoria.bind(this);
    }

    createCategoria(e) {
        e.preventDefault();
        console.log(this.state)
        const categoria = {
            nome: e.target[0].value.trim(),
        };

        if (!categoria.nome) {
            return;
        }
        this.setState({
            renderizarForm: false,
        });

        this.categoria = null;
        this.props.createCategoria(categoria);
    }
    updateCategoria(e) {
        e.preventDefault();

        const categoria = {
            nome: e.target[0].value.trim(),
        };

        if (!categoria.nome) {
            return;
        }

        this.setState({
            renderizarForm: false,
        });

        this.categoria = null;
        this.props.updateCategoria(categoria);
    }

    deleteCategoria(id) {
        if (this.categoria.id === id) {
            this.setState({
                renderizarForm: false,
            });
        }
        this.props.deleteCategoria(id);
    }

    renderForm(categoria = null) {
        this.setState({
            renderizarForm: true,
        });
        if (categoria === null) {
            this.categoria = {};
            this.handleSubmit = this.createCategoria;
        } else {
            this.categoria = categoria;
            this.handleSubmit = this.updateCategoria;
        }
    }

    cancelForm() {
        this.setState({
            renderizarForm: false,
        });
    }

    render() {
        return (
            <div>
                <ContentHeader title='Categorias' small='Pesquisar' />
                <Content>
                    <button onClick={() => this.renderForm()}>Novo</button>
                    {
                        this.state.renderizarForm
                            ? <Form
                                categoria={this.state.categoria}
                                handleSubmit={this.handleSubmit}
                                cancelForm={this.cancelForm}
                            />
                            : null
                    }

                    <List
                        categoria={this.props.categoria}
                        renderForm={this.renderForm}
                        deleteCategoria={this.deleteCategoria}
                    />
                </Content>
            </div >
        )
    }

}

const mapStateToProps = (state) => ({
    categoria: state.categoria,
});

const mapDispatchToProps = (dispatch) => ({
    createCategoria: (categoria) => { dispatch(createCategoria(categoria)); },
    updateCategoria: (categoria) => { dispatch(updateCategoria(categoria)); },
    deleteCategoria: (id) => { dispatch(deleteCategoria(id)); },
});

export default connect(mapStateToProps, mapDispatchToProps)(Categoria);