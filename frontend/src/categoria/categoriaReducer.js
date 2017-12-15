import { CATEGORIA } from './categoriaActions';

const initialState = {
    categoria: { nome: '' },
    list: []
};

export default function standards(state = initialState, action) {
    switch (action.type) {
        case CATEGORIA.FETCHED:
            return {
                ...state,
                list: action.data
            }
        case CATEGORIA.CREATE:
            return {
                ...state,
                categoria: action.categoria.data
            }

        case CATEGORIA.UPDATE:
            return state.map((c) => {
                if (c.id !== action.categoria.id) {
                    return c;
                }
                return action.categoria;
            });

        case CATEGORIA.DELETE:
            return state.filter((c) => c.id !== action.id);
        case CATEGORIA.HANDLE_CHANGE:
            return {
                ...state,
                categoria: action.categoria
            }

        default:
            return state;
    }
}
