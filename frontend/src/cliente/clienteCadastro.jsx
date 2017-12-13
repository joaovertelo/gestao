import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import ContentHeader from '../common/template/contentHeader'
import Content from '../common/template/content'
import Form from './clienteForm'
import { create, update } from './clienteActions'

class ClienteCadastro extends Component {
    constructor(props) {
        super(props)
        this.state = this.props.cliente
    }


    render() {
        console.log("State" + this.state)
        return (
            <div>
                <ContentHeader title='Clientes' small='Cadastro' />
                <Content>
                    <div className="panel panel-default">
                        <Form onSubmit={this.props.create} />
                        <Form onSubmit={this.props.update} />
                    </div>

                </Content>
            </div>
        )
    }
}

const mapStateToProps = state => ({ cliente: state.cliente.cliente })
const mapDispatchToProps = dispatch => bindActionCreators({ create, update }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ClienteCadastro)