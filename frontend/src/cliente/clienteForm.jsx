import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { reduxForm, Field, formValueSelector } from 'redux-form'
import { browserHistory } from 'react-router'

import LabelAndInput from '../common/form/labelAndInput'
import ButtonLink from '../common/template/buttonLink'
import Grid from '../common/layout/grid'
import If from '../common/operator/if'

class ClienteForm extends Component {
    constructor(props) {
        super(props)
        this.state = this.props.cliente || {
            nome: '',
            email: '',
            telefone: '',
            dataNasc: ''
        }
    }



    handleChange(e) {

        this.setState(...this.state, { [e.target.name]: e.target.value })
        console.log(this.state)
    }

    submit(e) {
        e.preventDefault()
        this.props.onSubmit(this.state)
        this.forceUpdate()
        console.log(this.forceUpdate())
    }


    render() {
        const { nome, telefone, email, dataNasc } = this.state
        return (
            <form name='clienteForm' role='form' onSubmit={this.submit.bind(this)}>
                <div className="box-body">
                    <Grid cols='12'>
                        <div className="form-group">
                            <label htmlFor='nome' >Nome</label>
                            <input value={nome} type='text' name='nome' onChange={this.handleChange.bind(this)}
                                placeholder='Informe o nome...' className='form-control' />
                        </div>
                    </Grid>
                    <Grid cols='4'>
                        <div className="form-group">
                            <label htmlFor='email' >Email</label>
                            <input value={email} type='email' name='email' onChange={this.handleChange.bind(this)}
                                placeholder='Informe o email...' className='form-control' />
                        </div>
                    </Grid>
                    <Grid cols='4'>
                        <div className="form-group">
                            <label htmlFor='dataNasc' >Data Nascimento</label>
                            <input value={dataNasc} type='text' name='dataNasc' onChange={this.handleChange.bind(this)}
                                placeholder='Informe a data de nascimento...' className='form-control' />
                        </div>
                    </Grid>
                    <Grid cols='4'>
                        <div className="form-group">
                            <label htmlFor='telefone' >Telefone</label>
                            <input value={telefone} type='text' name='telefone' onChange={this.handleChange.bind(this)}
                                placeholder='Informe o telefone...' className='form-control' />
                        </div>
                    </Grid>

                </div>

                <div className="box-footer">
                    <div className="pull-right">

                        <button type='submit' className={`btn btn-primary active`}> <i className={`fa fa-floppy-o`} ></i>
                            <span className='span-button'>Submit</span></button>

                        <ButtonLink path='/cliente' label='Excluir' type='danger' active='active' icon='trash-o' />
                        <ButtonLink path='/clientes' label='Voltar' type='warning' active='active' icon='arrow-left' />
                    </div>
                </div>
            </form>
        )
    }
}

const mapStateToProps = state => ({ cliente: state.cliente.cliente })

//const mapDispatchToProps = dispatch => bindActionCreators({ init, create }, dispatch)

export default connect(mapStateToProps)(ClienteForm)