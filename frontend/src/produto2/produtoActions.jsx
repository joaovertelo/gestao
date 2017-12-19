import axios from 'axios'
import { toastr } from 'react-redux-toastr'
import { reset as resetForm, initialize } from 'redux-form'

const BASE_URL = 'http://localhost:8081/api'


export function getList() {
    const request = axios.get(`${BASE_URL}/produtos`)
    return {
        type: 'PRODUTOS_FETCHED',
        payload: request
    }
}

export function create(values) {
    console.log(values)
    return submit(values, 'post')
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
        axios[method](`${BASE_URL}/produtos/${id}`, values)
            .then(resp => {
                toastr.success('Sucesso', 'Operação realizada com sucesso.')
                dispatch(init())
            }).catch(e => {
                e.response.data.errors.forEach(error => toastr.error('Erro', error))
            })

    }
}

export function init() {
    return [
        getList(),
        initialize('produtoForm', INITIAL_VALUE)
    ]
}