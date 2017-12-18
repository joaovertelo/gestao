import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { toastr } from 'react-redux-toastr'

import Content from '../common/template/content'
import ContentHeader from '../common/template/contentHeader'
import List from './categoriaList'
import { cadastrar, createCategoria, updateCategoria, deleteCategoria, handleChange, getList } from './categoriaActions'
import Form from './categoriaForm'
import Grid from '../common/layout/grid'
import If from '../common/operator/if'

class Categoria extends Component {

    componentWillMount() {
        this.props.getList()
    }

    constructor(props) {
        super(props);

        this.state

        this.createCategoria = this.createCategoria.bind(this);
        this.updateCategoria = this.updateCategoria.bind(this);

        this.deleteCategoria = this.deleteCategoria.bind(this);
    }

    visualizar(categoria) {
        // this.setState({
        //     renderizarForm: false,
        //     categoria: categoria
        // });



    }
    createCategoria(categoria) {
        if (!categoria.nome) {
            toastr.error('Validação', 'Preencha o nome')
            return;
        }

        this.props.createCategoria(categoria);

    }

    updateCategoria(categoria) {
        if (!categoria.nome) {
            toastr.error('Validação', 'Preencha o nome')
            return;
        }
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
    cancelForm() {
        this.setState({
            renderizarForm: false,
        });
    }

    render() {
        const { renderizarForm } = this.props.categoria
        return (
            <div>
                <ContentHeader title='Categorias' />

                <Content>
                    <If test={renderizarForm}>
                        <Form
                            submitCreate={this.createCategoria.bind(this)}
                            submitUpdate={this.updateCategoria.bind(this)}
                        />
                    </If>
                    <If test={!renderizarForm}>
                        <div >
                            <Grid cols='12 12'>
                                <button type="button" onClick={this.props.cadastrar} className='btn btn-primary button-float-right'>
                                    <i className='fa fa-plus' ></i>
                                    <span className='span-button'>Novo</span>
                                </button >
                            </Grid>
                            < List
                                list={this.props.list}
                                visualizar={this.visualizar}
                                cancelForm={this.cancelForm}
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
    list: state.categoria.list,
    renderizarForm: state.renderizarForm
});

const mapDispatchToProps = dispatch => bindActionCreators({ cadastrar, getList, createCategoria, updateCategoria, deleteCategoria, handleChange }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Categoria);