import axios from 'axios'
import { toastr } from 'react-redux-toastr'
import { browserHistory } from 'react-router'

const BASE_URL = 'http://localhost:8081/api'

export const PRODUTO = {
    CADASTRAR: 'CADASTRAR_PRODUTO',
    CREATE: 'CRIAR_PRODUTO',
    DELETE: 'DELETAR_PRODUTO',
    UPDATE: 'ATUALIZAR_PRODUTO',
    FETCHED: 'PRODUTOS_FETCHED',
    HANDLE_CHANGE: 'HANDLE_CHANGE',
    VISUALIZAR_PRODUTO: 'VISUALIZAR_PRODUTO',
    EDITAR_PRODUTO: 'EDITAR_PRODUTO',
    CANCEL: 'CANCEL'
};

export function cadastrar() {
    return {
        type: PRODUTO.CADASTRAR
    }
}


export function visualizar(produto) {
    return {
        type: PRODUTO.VISUALIZAR_PRODUTO,
        payload: produto
    }
}
export function editar(produto) {
    return {
        type: PRODUTO.EDITAR_PRODUTO,
        payload: produto
    }
}


export function getList() {
    const request = axios.get(`${BASE_URL}/produtos`)
    return {
        type: PRODUTO.FETCHED,
        payload: request
    }
}

export const create = (produto) => {
    return dispatch => {

        produto = JSON.stringify(produto)
        console.log(produto)
        const request = axios.post(`${BASE_URL}/produtos`, produto)
            .then(resp => {
                toastr.success('Sucesso', `Produto criado com sucesso.`)
                dispatch(init())
            }).catch(e => {
                toastr.error('Error', `Erro ao criar Produto ${e}`)
                //e.response.data.errors.forEach(error => toastr.error('Erro', error))
            })
    }
}

export const update = (produto) => {
    return dispatch => {

        produto = JSON.stringify(produto)
        const request = axios.put(`${BASE_URL}/produtos`, produto)
            .then(resp => {
                toastr.success('Sucesso', `Produto atualizado com sucesso.`)
                dispatch(init())
            }).catch(e => {
                toastr.error('Error', `Erro ao salvar Produto ${e}`)
            })
    }
}

export const excluir = (id) => {
    return dispatch => {
        console.log('delete', id)
        const request = axios.delete(`${BASE_URL}/produtos/${id}`)
            .then(resp => {
                toastr.success('Sucesso', `Produto excluido com sucesso.`)
                dispatch(init())
            }).catch(e => {
                toastr.error('Error', `Erro ao excluir Produto ${e}`)
            })
    }
}

export function handleChange(produto) {
    return {
        type: PRODUTO.HANDLE_CHANGE,
        payload: produto
    }
};

export function cancel() {
    return [{
        type: PRODUTO.CANCEL
    }, getList()
    ]
}

export function init() {
    return [
        getList()
    ]
}