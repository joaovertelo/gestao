const INITITAL_STATE = {
    list: [],
    cliente: {
        nome: ''
    },
    nome: '',
    telefone: '',
    email: '',
    fetched: false,
    error: null
}

export default function (state = INITITAL_STATE, action) {
    switch (action.type) {
        case 'CLIENTE_FETCHED':
            return { ...state, list: action.payload.data }
        case 'CLIENTE_SELECTED':
            return { ...state, cliente: action.payload }
        default:
            return state
    }
}