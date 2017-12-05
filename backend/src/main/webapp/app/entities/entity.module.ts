import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { GestaoClienteModule } from './cliente/cliente.module';
import { GestaoPedidoModule } from './pedido/pedido.module';
import { GestaoProdutoModule } from './produto/produto.module';
import { GestaoTipoProdutoModule } from './tipo-produto/tipo-produto.module';
import { GestaoCategoriaModule } from './categoria/categoria.module';
import { GestaoPedidoProdutoModule } from './pedido-produto/pedido-produto.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        GestaoClienteModule,
        GestaoPedidoModule,
        GestaoProdutoModule,
        GestaoTipoProdutoModule,
        GestaoCategoriaModule,
        GestaoPedidoProdutoModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GestaoEntityModule {}
