const INITITAL_STATE = { list: [] }

export default function (state = INITITAL_STATE, action) {
    switch (action.type) {
        case 'CLIENTE_FETCHED':
            return { ...state, list: action.payload.data }
        default:
            return state
    }
}