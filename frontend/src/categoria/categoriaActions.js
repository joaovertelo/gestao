import axios from 'axios'
import { toastr } from 'react-redux-toastr'
import { browserHistory } from 'react-router'

const BASE_URL = 'http://localhost:8081/api'

export const CATEGORIA = {
    CREATE: 'CRIAR_CATEGORIA',
    DELETE: 'DELETAR_CATEGORIA',
    UPDATE: 'ATUALIZAR_CATEGORIA',
    FETCHED: 'CATEGORIA_FETCHED',
    HANDLE_CHANGE: 'HANDLE_CHANGE'
};

export const createCategoria = (categoria) => {
    categoria = JSON.stringify(categoria)
    const request = axios.post(`${BASE_URL}/categorias`, categoria)
        .then(resp => {
            toastr.success('Sucesso', `Cliente criado com sucesso.`)

        }).catch(e => {
            toastr.error('Error', `Erro ao criar cliente ${e}`)
            //e.response.data.errors.forEach(error => toastr.error('Erro', error))
        })
    return {
        type: CATEGORIA.CREATE,
        categoria: request
    }

}

export const updateCategoria = (categoria) => ({
    type: CATEGORIA.UPDATE,
    categoria,
});

export const deleteCategoria = (id) => ({
    type: CATEGORIA.DELETE,
    id,
});

export function handleChange(categoria) {
    return {
        type: CATEGORIA.HANDLE_CHANGE,
        categoria
    }
};