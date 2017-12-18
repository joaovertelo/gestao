import axios from 'axios'
import { toastr } from 'react-redux-toastr'
import { Redirect } from 'react-router'
import { browserHistory } from 'react-router'

const env = require('../.env')

const BASE_URL = 'http://localhost:8081/api'
const INITIAL_VALUE = {}


export function selectCliente(cliente) {
    return {
        type: 'CLIENTE_SELECTED',
        payload: cliente
    }
}

export function getList() {

    const request = axios.get(`${BASE_URL}/clientes`)
    return {
        type: 'CLIENTE_FETCHED',
        payload: request
    }
}

export function create(values) {
    return dispatch => {
        if (values.id) {
            delete values.id
        }
        values = JSON.stringify(values)
        axios.post(`${BASE_URL}/clientes`, values)
            .then(resp => {
                toastr.success('Sucesso', `Cliente criado com sucesso.`)
                dispatch(init())
            }).then(
            () => browserHistory.goBack()
            ).catch(e => {
                toastr.error('Error', `Erro ao criar cliente ${e}`)
                //e.response.data.errors.forEach(error => toastr.error('Erro', error))
            })

    }
}

export function update(values) {
    return dispatch => {
        values = JSON.stringify(values)
        axios.put(`${BASE_URL}/clientes`, values)
            .then(resp => {
                toastr.success('Sucesso', 'Cliente salvo com sucesso.')
                dispatch(init())
            }).then(
            () => browserHistory.goBack()
            ).catch(e => {
                e.response.data.errors.forEach(error => toastr.error('Erro', error))
            })

    }
}

export function remove(values) {
    return submit(values, 'delete')
}

function submit(values, method) {
    return dispatch => {
        const id = values.id ? values.id : ''
        values = JSON.stringify(values)
        axios[method](`${BASE_URL}/clientes`, values)
            .then(resp => {
                toastr.success('Sucesso', 'Cliente salvo com sucesso.')
                dispatch(init())
            }).then(
            () => browserHistory.goBack()
            ).catch(e => {
                e.response.data.errors.forEach(error => toastr.error('Erro', error))
            })

    }
}

export function init() {
    return [
        getList()
    ]
}