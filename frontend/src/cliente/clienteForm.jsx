import React, { Component } from 'react'
import ButtonLink from '../common/template/buttonLink'
import ContentHeader from '../common/template/contentHeader'
import Content from '../common/template/content'
import { Field } from 'redux-form'
import LabelAndInput from '../common/form/labelAndInput'



class ClienteForm extends Component {

    render() {
        return (
            <div>
                <ContentHeader title='Clientes' small='Cadastro' />
                <Content>
                    <div className="panel panel-default">
                        <form role='form'>
                            <div className="box-body">

                            </div>

                            <div className="box-footer">
                                <ButtonLink path='/cliente' label='Salvar' type='primary' active='active' icon='floppy-o ' />
                                <ButtonLink path='/cliente' label='Excluir' type='danger' active='active' icon='trash-o' />
                                <ButtonLink path='/cliente' label='Voltar' type='warning' active='active' icon='arrow-left' />
                            </div>
                        </form>
                    </div>

                </Content>
            </div>
        )
    }
}

export default ClienteForm