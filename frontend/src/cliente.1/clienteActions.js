import axios from 'axios'
import { toastr } from 'react-redux-toastr'

const env = require('../.env')

const BASE_URL = 'http://localhost:8081/api'
const INITIAL_VALUE = {}

export function getList() {
    const request = axios.get(`${BASE_URL}/clientes`)
    return {
        type: 'CLIENTE_FETCHED',
        payload: request
    }
}

export function visualizar(cliente) {
    console.log(cliente)
    return {
        type: 'VIZUALIZAR'
    }
}

export function create(values) {
    console.log(JSON.stringify(values))
    return submit(JSON.stringify(values), 'post')
}

export function update(values) {
    return submit(values, 'put')
}

export function remove(values) {
    return submit(values, 'delete')
}

function submit(values, method) {
    return dispatch => {
        const id = values._id ? values._id : ''
        axios[method](`${BASE_URL}/clientes/${id}`, values)
            .then(resp => {
                toastr.success('Sucesso', 'Cliente salvo com sucesso.')
                this.props.dispatch(getList())
            }).catch(e => {
                e.response.data.errors.forEach(error => toastr.error('Erro', error))
            })

    }
}

export function init() {
    return [
        getList()

    ]
}