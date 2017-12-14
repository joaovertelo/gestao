import React from 'react'
import MenuItem from './menuItem'
import MenuTree from './menuTree'

export default props => (
    <ul className="sidebar-menu">
        <MenuItem path='/' label='Início' icon='dashboard' />
        <MenuTree label='Cadastro' icon='edit'>
            <MenuItem path='/clientes'
                label='Cliente' icon='user' />
            <MenuItem path='/categorias'
                label='Categoria' icon='user' />
            <MenuItem path='/produtos'
                label='Produto' icon='user' />
        </MenuTree>
    </ul>
)