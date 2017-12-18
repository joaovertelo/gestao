import axios from 'axios'
import { toastr } from 'react-redux-toastr'
import { browserHistory } from 'react-router'

const BASE_URL = 'http://localhost:8081/api'

export const CATEGORIA = {
    CADASTRAR: 'CADASTRAR_CATEGORIA',
    CREATE: 'CRIAR_CATEGORIA',
    DELETE: 'DELETAR_CATEGORIA',
    UPDATE: 'ATUALIZAR_CATEGORIA',
    FETCHED: 'CATEGORIAS_FETCHED',
    HANDLE_CHANGE: 'HANDLE_CHANGE',
    VISUALIZAR_CATEGORIA: 'VISUALIZAR_CATEGORIA',
    EDITAR_CATEGORIA: 'EDITAR_CATEGORIA',
    CANCEL: 'CANCEL'
};

export function cadastrar() {
    return {
        type: CATEGORIA.CADASTRAR
    }
}


export function visualizar(categoria) {
    return {
        type: CATEGORIA.VISUALIZAR_CATEGORIA,
        payload: categoria
    }
}
export function editar(categoria) {
    return {
        type: CATEGORIA.EDITAR_CATEGORIA,
        payload: categoria
    }
}


export function getList() {
    const request = axios.get(`${BASE_URL}/categorias`)
    return {
        type: CATEGORIA.FETCHED,
        payload: request
    }
}

export const createCategoria = (categoria) => {
    return dispatch => {

        categoria = JSON.stringify(categoria)

        const request = axios.post(`${BASE_URL}/categorias`, categoria)
            .then(resp => {
                toastr.success('Sucesso', `Cliente criado com sucesso.`)
                dispatch(init())
            }).catch(e => {
                toastr.error('Error', `Erro ao criar cliente ${e}`)
                //e.response.data.errors.forEach(error => toastr.error('Erro', error))
            })
    }
}

export const updateCategoria = (categoria) => {
    return dispatch => {

        categoria = JSON.stringify(categoria)
        const request = axios.put(`${BASE_URL}/categorias`, categoria)
            .then(resp => {
                toastr.success('Sucesso', `Cliente atualizado com sucesso.`)
                dispatch(init())
            }).catch(e => {
                toastr.error('Error', `Erro ao criar cliente ${e}`)
            })
    }
}

export const deleteCategoria = (id) => {
    return dispatch => {

        categoria = JSON.stringify(categoria)
        console.log('atualizar', categoria)
        const request = axios.put(`${BASE_URL}/categorias`, categoria)
            .then(resp => {
                toastr.success('Sucesso', `Cliente atualizado com sucesso.`)
                dispatch(init())
            }).catch(e => {
                toastr.error('Error', `Erro ao criar cliente ${e}`)
            })
    }
}

export function handleChange(categoria) {
    return {
        type: CATEGORIA.HANDLE_CHANGE,
        payload: categoria
    }
};

export function cancel() {
    return [{
        type: CATEGORIA.CANCEL
    }, getList()
    ]
}

export function init() {
    return [
        getList()
    ]
}