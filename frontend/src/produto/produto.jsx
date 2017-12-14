import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import ContentHeader from '../common/template/contentHeader'
import Content from '../common/template/content'
import ButtonLink from '../common/template/buttonLink'

import { init, create, update, remove } from './produtoActions'
import List from './produtoList'
import Form from './produtoForm'

class Produto extends Component {


    render() {
        return (
            <div>
                <ContentHeader title='Produto' small='Pesquisar' />
                <Content>
                    <ButtonLink path='/produtos/produto' label='Novo' type='primary' active='active' icon='plus' buttonFloatRight='button-float-right' />
                    <List />
                    <Form onSubmit={this.props.create} submitClass='primary' submitLabel='Incluir' />
                </Content>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    init, create, update, remove
}, dispatch)

export default connect(null, mapDispatchToProps)(Produto)
// export default Produto