const INITITAL_STATE = { list: [],
    produto: {
        nome: '',
        preco: ''
    } }

export default function (state = INITITAL_STATE, action) {
    switch (action.type) {
        case 'PRODUTOS_FETCHED':
            return { ...state, list: action.payload.data }
        default:
            return state
    }
}