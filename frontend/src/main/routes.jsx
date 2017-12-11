import React from 'react'
import { Router, Route, IndexRoute, Redirect, hashHistory } from 'react-router'

import App from './app'
import Inicio from '../inicio/inicio'
import Cliente from '../cliente/cliente'
import ClienteCadastro from '../cliente/clienteCadastro'

export default props => (
    <Router history={hashHistory}>
        <Route path='/' component={App}>
            <IndexRoute component={Inicio} />
            <Route path='/cliente' component={Cliente} />
            <Route path='/cliente/cadastro' component={ClienteCadastro} />
        </Route>
        <Redirect from='*' to='/' />
    </Router>
)