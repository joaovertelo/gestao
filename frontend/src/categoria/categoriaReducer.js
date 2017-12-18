import { CATEGORIA } from './categoriaActions';

const initialState = {
    categoria: { nome: '' },
    list: [],
    renderizarForm: false,
    novo: false,
    editar: false,
    visualizar: false,
    readOnly: false
};

export default function standards(state = initialState, action) {
    switch (action.type) {
        case CATEGORIA.CANCEL:
            return {
                initialState
            }
        case CATEGORIA.CADASTRAR:
            return {
                ...initialState,
                renderizarForm: true,
                novo: true
            }
        case CATEGORIA.EDITAR:
            return {
                ...state,
                categoria: action.payload,
                renderizarForm: true,
                readOnly: false,
                novo: false
            }
        case CATEGORIA.VISUALIZAR_CATEGORIA:
            return {
                ...state,
                categoria: action.payload,
                renderizarForm: true,
                readOnly: true,
                novo: false,
                visualizar: true
            }
        case CATEGORIA.EDITAR_CATEGORIA:
            return {
                ...state,
                categoria: action.payload,
                renderizarForm: true,
                readOnly: false,
                novo: false,
                visualizar: false
            }
        case CATEGORIA.FETCHED:
            return {
                ...initialState,
                list: action.payload.data
            }
        case CATEGORIA.UPDATE:
            return state.map((c) => {
                if (c.id !== action.payload.id) {
                    return c;
                }
                return action.payload;
            });

        case CATEGORIA.DELETE:
            return state.filter((c) => c.id !== action.id);
        case CATEGORIA.HANDLE_CHANGE:
            return {
                ...state,
                categoria: action.payload
            }

        default:
            return state;
    }
}
