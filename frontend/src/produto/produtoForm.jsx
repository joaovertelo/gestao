import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { reduxForm, Field, formValueSelector } from 'redux-form'
import LabelAndInput from '../common/form/labelAndInput'
import { init } from '../produto/produtoActions'


class ProdutoForm extends Component {


    render() {
        const { handleSubmit, readOnly, credits, debits } = this.props

        return (
            <form role='form' onSubmit={handleSubmit}>
                <div className="box-body">

                    <Field name='nome' component={LabelAndInput} readOnly={readOnly}
                        label='Nome' cols='12 12' placeholder='Informe o nome' />
                    <Field name='preco' component={LabelAndInput} type='number' readOnly={readOnly}
                        label='Preço' cols='12 4' placeholder='Informe o preço' />

                </div>
                <div className="box-footer">
                    <button type='submit' className={`btn btn-${this.props.submitClass}`}>{this.props.submitLabel}</button>
                    <button type='button' className='btn btn-default' onClick={this.props.init}>Cancelar</button>
                </div>
            </form>
        )
    }
}

ProdutoForm = reduxForm({ form: 'produtoForm', destroyOnUnmount: false })(ProdutoForm)

const mapDispatchToProps = dispatch => bindActionCreators({ init }, dispatch)


export default connect(null, mapDispatchToProps)(ProdutoForm)