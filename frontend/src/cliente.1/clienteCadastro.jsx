import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import ContentHeader from '../common/template/contentHeader'
import Content from '../common/template/content'
import Form from './clienteForm'
import { create } from './clienteActions'

class ClienteCadastro extends Component {



    render() {
        return (
            <div>
                <ContentHeader title='Clientes' small='Cadastro' />
                <Content>
                    <div className="panel panel-default">
                        <Form onSubmit={this.props.create} />
                    </div>

                </Content>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({ create }, dispatch)

export default connect(null, mapDispatchToProps)(ClienteCadastro)