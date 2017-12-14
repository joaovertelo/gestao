import React from 'react'
import { Router, Route, IndexRoute, Redirect, hashHistory } from 'react-router'

import App from './app'
import Inicio from '../inicio/inicio'
import Cliente from '../cliente/cliente'
import ClienteCadastro from '../cliente/clienteCadastro'
import Categoria from '../categoria/categoria'
import Produto from '../produto/produto'

export default props => (
    <Router history={hashHistory}>
        <Route path='/' component={App}>
            <IndexRoute component={Inicio} />
            <Route path='/clientes' component={Cliente} />
            <Route path='/cliente' component={ClienteCadastro} />
            <Route path='/categorias' component={Categoria} />
            <Route path='/produtos' component={Produto} />
        </Route>
        <Redirect from='*' to='/' />
    </Router>
)