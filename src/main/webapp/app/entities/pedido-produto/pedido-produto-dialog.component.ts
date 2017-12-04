import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { PedidoProduto } from './pedido-produto.model';
import { PedidoProdutoPopupService } from './pedido-produto-popup.service';
import { PedidoProdutoService } from './pedido-produto.service';
import { Pedido, PedidoService } from '../pedido';
import { Produto, ProdutoService } from '../produto';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-pedido-produto-dialog',
    templateUrl: './pedido-produto-dialog.component.html'
})
export class PedidoProdutoDialogComponent implements OnInit {

    pedidoProduto: PedidoProduto;
    isSaving: boolean;

    pedidos: Pedido[];

    produtos: Produto[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private pedidoProdutoService: PedidoProdutoService,
        private pedidoService: PedidoService,
        private produtoService: ProdutoService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.pedidoService.query()
            .subscribe((res: ResponseWrapper) => { this.pedidos = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.produtoService.query()
            .subscribe((res: ResponseWrapper) => { this.produtos = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.pedidoProduto.id !== undefined) {
            this.subscribeToSaveResponse(
                this.pedidoProdutoService.update(this.pedidoProduto));
        } else {
            this.subscribeToSaveResponse(
                this.pedidoProdutoService.create(this.pedidoProduto));
        }
    }

    private subscribeToSaveResponse(result: Observable<PedidoProduto>) {
        result.subscribe((res: PedidoProduto) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: PedidoProduto) {
        this.eventManager.broadcast({ name: 'pedidoProdutoListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackPedidoById(index: number, item: Pedido) {
        return item.id;
    }

    trackProdutoById(index: number, item: Produto) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-pedido-produto-popup',
    template: ''
})
export class PedidoProdutoPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private pedidoProdutoPopupService: PedidoProdutoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.pedidoProdutoPopupService
                    .open(PedidoProdutoDialogComponent as Component, params['id']);
            } else {
                this.pedidoProdutoPopupService
                    .open(PedidoProdutoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
