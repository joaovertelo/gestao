import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { PedidoProduto } from './pedido-produto.model';
import { PedidoProdutoPopupService } from './pedido-produto-popup.service';
import { PedidoProdutoService } from './pedido-produto.service';

@Component({
    selector: 'jhi-pedido-produto-delete-dialog',
    templateUrl: './pedido-produto-delete-dialog.component.html'
})
export class PedidoProdutoDeleteDialogComponent {

    pedidoProduto: PedidoProduto;

    constructor(
        private pedidoProdutoService: PedidoProdutoService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.pedidoProdutoService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'pedidoProdutoListModification',
                content: 'Deleted an pedidoProduto'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-pedido-produto-delete-popup',
    template: ''
})
export class PedidoProdutoDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private pedidoProdutoPopupService: PedidoProdutoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.pedidoProdutoPopupService
                .open(PedidoProdutoDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
