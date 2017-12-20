import { PRODUTO } from './produtoActions';

const initialState = {
    produto: {
        nome: '',
        preco: '',
        categoria: { id: '' }
    },
    list: [],
    listCategorias: [],
    renderizarForm: false,
    novo: false,
    editar: false,
    visualizar: false,
    readOnly: false
};

export default function standards(state = initialState, action) {
    switch (action.type) {
        case PRODUTO.CANCEL:
            return {
                initialState
            }
        case PRODUTO.CADASTRAR:
            return {
                ...initialState,
                renderizarForm: true,
                novo: true
            }
        case PRODUTO.EDITAR:
            return {
                ...state,
                produto: action.payload,
                renderizarForm: true,
                readOnly: false,
                novo: false
            }
        case PRODUTO.VISUALIZAR_PRODUTO:
            return {
                ...state,
                produto: action.payload,
                renderizarForm: true,
                readOnly: true,
                novo: false,
                visualizar: true
            }
        case PRODUTO.EDITAR_PRODUTO:
            return {
                ...state,
                produto: action.payload,
                renderizarForm: true,
                readOnly: false,
                novo: false,
                visualizar: false
            }
        case PRODUTO.FETCHED:
            return {
                ...initialState,
                list: action.payload.data
            }
        case PRODUTO.UPDATE:
            return state.map((c) => {
                if (c.id !== action.payload.id) {
                    return c;
                }
                return action.payload;
            });

        case PRODUTO.DELETE:
            return state.filter((c) => c.id !== action.id);
        case PRODUTO.HANDLE_CHANGE:
            return {
                ...state,
                produto: action.payload
            }

        default:
            return state;
    }
}
