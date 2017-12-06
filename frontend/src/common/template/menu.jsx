import React from 'react'
import MenuItem from './menuItem'
import MenuTree from './menuTree'

export default props => (
    <ul className="sidebar-menu">
        <MenuItem path='/' label='Início' icon='dashboard' />
        <MenuTree label='Cadastro' icon='edit'>
            <MenuItem path='/cliente'
                label='Cliente' icon='user' />
        </MenuTree>
    </ul>
)