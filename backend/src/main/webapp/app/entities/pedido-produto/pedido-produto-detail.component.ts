import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { PedidoProduto } from './pedido-produto.model';
import { PedidoProdutoService } from './pedido-produto.service';

@Component({
    selector: 'jhi-pedido-produto-detail',
    templateUrl: './pedido-produto-detail.component.html'
})
export class PedidoProdutoDetailComponent implements OnInit, OnDestroy {

    pedidoProduto: PedidoProduto;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private pedidoProdutoService: PedidoProdutoService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPedidoProdutos();
    }

    load(id) {
        this.pedidoProdutoService.find(id).subscribe((pedidoProduto) => {
            this.pedidoProduto = pedidoProduto;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPedidoProdutos() {
        this.eventSubscriber = this.eventManager.subscribe(
            'pedidoProdutoListModification',
            (response) => this.load(this.pedidoProduto.id)
        );
    }
}
