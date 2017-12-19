import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { toastr } from 'react-redux-toastr'

import Content from '../common/template/content'
import ContentHeader from '../common/template/contentHeader'
import List from './produtoList'
import { cadastrar, create, update, excluir, handleChange, getList } from './produtoActions'
import Form from './produtoForm'
import Grid from '../common/layout/grid'
import If from '../common/operator/if'  

class Produto extends Component {

    componentWillMount() {
        this.props.getList()
    }

    constructor(props) {
        super(props);

        this.create = this.create.bind(this);
        this.update = this.update.bind(this);

        this.excluir = this.excluir.bind(this);
    }


    create(produto) {
        if (!produto.nome) {
            toastr.error('Validação', 'Preencha o nome')
            return;
        }

        this.props.create(produto);

    }

    update(produto) {
        if (!produto.nome) {
            toastr.error('Validação', 'Preencha o nome')
            return;
        }
        this.props.update(produto);
    }

    excluir(id) {
        if (this.produto.id === id) {
            this.setState({
                renderizarForm: false,
            });
        }
        this.props.excluir(id);
    }

    novo() {
        this.forceUpdate()
        this.props.cadastrar()
    }

    render() {
        const { renderizarForm } = this.props.produto
        return (
            <div>
                <ContentHeader title='Produtos' />

                <Content>
                    <If test={renderizarForm}>
                        <Form
                            submitCreate={this.create.bind(this)}
                            submitUpdate={this.update.bind(this)}
                        />
                    </If>
                    <If test={!renderizarForm}>
                        <div >
                            <Grid cols='12 12'>
                                <button type="button" onClick={this.novo.bind(this)} className='btn btn-primary button-float-right'>
                                    <i className='fa fa-plus' ></i>
                                    <span className='span-button'>Novo</span>
                                </button >
                            </Grid>
                            < List
                                list={this.props.list}
                                visualizar={this.visualizar}
                            />
                        </div>
                    </If>
                </Content>
            </div >
        )
    }

}

const mapStateToProps = (state) => ({
    produto: state.produto,
    list: state.produto.list
});

const mapDispatchToProps = dispatch => bindActionCreators({ cadastrar, getList, create, update, excluir, handleChange }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Produto);