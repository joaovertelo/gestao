import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { toastr } from 'react-redux-toastr'

import Content from '../common/template/content'
import ContentHeader from '../common/template/contentHeader'
import List from './categoriaList'
import { createCategoria, updateCategoria, deleteCategoria, handleChange } from './categoriaActions'
import Form from './categoriaForm'
import Grid from '../common/layout/grid'
import If from '../common/operator/if'

class Categoria extends Component {

    componentWillMount() {

    }

    constructor(props) {
        super(props);

        this.categoria = null;
        this.state = { categoria: this.props.categoria, renderizarForm: false }
        this.renderForm = this.renderForm.bind(this);
        this.cancelForm = this.cancelForm.bind(this);

        this.createCategoria = this.createCategoria.bind(this);
        this.updateCategoria = this.updateCategoria.bind(this);

        this.deleteCategoria = this.deleteCategoria.bind(this);
    }

    createCategoria(categoria) {
        if (!categoria.nome) {
            toastr.error('Validação', 'Preencha o nome')
            return;
        }
        this.setState({
            renderizarForm: false,
        });
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

        this.setState(...this.state, {
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
                <ContentHeader title='Categorias' />

                <Content>
                    <If test={this.state.renderizarForm}>
                        <Form
                            handleSubmit={this.handleSubmit}
                            cancelForm={this.cancelForm}
                        />
                    </If>
                    <If test={!this.state.renderizarForm}>
                        <div >
                            <Grid cols='12 12'>
                                <button type="button" onClick={() => this.renderForm()} className='btn btn-primary button-float-right'>
                                    <i className='fa fa-plus' ></i>
                                    <span className='span-button'>Novo</span>
                                </button >
                            </Grid>
                            < List
                                categoria={this.props.categoria}
                                deleteCategoria={this.deleteCategoria}
                            />
                        </div>
                    </If>
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
    deleteCategoria: (id) => { dispatch(deleteCategoria(id)); }, handleChange
});

export default connect(mapStateToProps, mapDispatchToProps)(Categoria);