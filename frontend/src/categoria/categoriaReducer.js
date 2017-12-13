import { CATEGORIA } from './categoriaActions';

const initialState = [];

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

        default:
            return state;
    }
}
