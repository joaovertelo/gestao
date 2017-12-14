import { CATEGORIA } from './categoriaActions';

const initialState = {
    categoria: { nome: '' }
};

export default function standards(state = initialState, action) {
    switch (action.type) {
        case CATEGORIA.CREATE:
            return [
                ...state,
                action.categoria,
            ];

        case CATEGORIA.UPDATE:
            return state.map((c) => {
                if (c.id !== action.categoria.id) {
                    return c;
                }
                return action.categoria;
            });

        case CATEGORIA.DELETE:
            return state.filter((c) => c.id !== action.id);
        case 'HANDLE_CHANGE':
            console.log('action', action)
            return {
                ...state,
                categoria: action.categoria
            }

        default:
            return state;
    }
}
