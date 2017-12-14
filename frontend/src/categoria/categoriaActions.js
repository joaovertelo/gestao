export const CATEGORIA = {
    CREATE: 'CRIAR_CATEGORIA',
    DELETE: 'DELETAR_CATEGORIA',
    UPDATE: 'ATUALIZAR_CATEGORIA',
};

export const createCategoria = (categoria) => ({
    type: CATEGORIA.CREATE,
    categoria,
});

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
        type: 'HANDLE_CHANGE',
        categoria
    }
};