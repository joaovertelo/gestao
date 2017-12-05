import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GestaoSharedModule } from '../../shared';
import {
    TipoProdutoService,
    TipoProdutoPopupService,
    TipoProdutoComponent,
    TipoProdutoDetailComponent,
    TipoProdutoDialogComponent,
    TipoProdutoPopupComponent,
    TipoProdutoDeletePopupComponent,
    TipoProdutoDeleteDialogComponent,
    tipoProdutoRoute,
    tipoProdutoPopupRoute,
} from './';

const ENTITY_STATES = [
    ...tipoProdutoRoute,
    ...tipoProdutoPopupRoute,
];

@NgModule({
    imports: [
        GestaoSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TipoProdutoComponent,
        TipoProdutoDetailComponent,
        TipoProdutoDialogComponent,
        TipoProdutoDeleteDialogComponent,
        TipoProdutoPopupComponent,
        TipoProdutoDeletePopupComponent,
    ],
    entryComponents: [
        TipoProdutoComponent,
        TipoProdutoDialogComponent,
        TipoProdutoPopupComponent,
        TipoProdutoDeleteDialogComponent,
        TipoProdutoDeletePopupComponent,
    ],
    providers: [
        TipoProdutoService,
        TipoProdutoPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GestaoTipoProdutoModule {}
