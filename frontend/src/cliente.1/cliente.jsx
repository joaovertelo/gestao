import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Content from '../common/template/content'
import ContentHeader from '../common/template/contentHeader'
import List from './clienteList'
import ButtonLink from '../common/template/buttonLink'
import { getList } from './clienteActions';

class Cliente extends Component {

    componentWillMount() {
        this.props.getList()
    }



    render() {
        return (
            <div>


                <div>
                    <ContentHeader title='Clientes' />
                    <Content>

                        <ButtonLink path='/cliente/cadastro' label='Novo' type='primary' active='active' icon='plus' buttonFloatRight='button-float-right' />

                        <div className="input-group col-sm-8">
                            <input type="text" className="form-control" placeholder="Pesquisar Clientes..." />
                            <span className="input-group-btn">
                                <button className="btn btn-default" type="button">
                                    <span className="glyphicon glyphicon-search"></span>
                                </button>
                            </span>
                        </div>

                        <List />

                    </Content>
                </div >
            </div>
        )
    }

}

const mapStateToProps = state => ({ list: state.cliente.list })

const mapDispatchToProps = dispatch => bindActionCreators({ getList }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Cliente)