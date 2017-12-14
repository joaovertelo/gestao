import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { reducer as toastrReducer } from 'react-redux-toastr'

import AuthReducer from '../auth/authReducer'
import ClienteReducers from '../cliente/clienteReducers'
import CategoriaReducer from '../categoria/categoriaReducer'
import ProdutoReducer from '../produto/produtoReducer'

const rootReducer = combineReducers({
    form: formReducer,
    toastr: toastrReducer,
    auth: AuthReducer,
    cliente: ClienteReducers,
    categoria: CategoriaReducer,
    produto: ProdutoReducer
})

export default rootReducer