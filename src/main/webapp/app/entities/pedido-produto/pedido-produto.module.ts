import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GestaoSharedModule } from '../../shared';
import {
    PedidoProdutoService,
    PedidoProdutoPopupService,
    PedidoProdutoComponent,
    PedidoProdutoDetailComponent,
    PedidoProdutoDialogComponent,
    PedidoProdutoPopupComponent,
    PedidoProdutoDeletePopupComponent,
    PedidoProdutoDeleteDialogComponent,
    pedidoProdutoRoute,
    pedidoProdutoPopupRoute,
} from './';

const ENTITY_STATES = [
    ...pedidoProdutoRoute,
    ...pedidoProdutoPopupRoute,
];

@NgModule({
    imports: [
        GestaoSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        PedidoProdutoComponent,
        PedidoProdutoDetailComponent,
        PedidoProdutoDialogComponent,
        PedidoProdutoDeleteDialogComponent,
        PedidoProdutoPopupComponent,
        PedidoProdutoDeletePopupComponent,
    ],
    entryComponents: [
        PedidoProdutoComponent,
        PedidoProdutoDialogComponent,
        PedidoProdutoPopupComponent,
        PedidoProdutoDeleteDialogComponent,
        PedidoProdutoDeletePopupComponent,
    ],
    providers: [
        PedidoProdutoService,
        PedidoProdutoPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GestaoPedidoProdutoModule {}
