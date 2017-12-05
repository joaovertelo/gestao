import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { TipoProduto } from './tipo-produto.model';
import { TipoProdutoService } from './tipo-produto.service';

@Component({
    selector: 'jhi-tipo-produto-detail',
    templateUrl: './tipo-produto-detail.component.html'
})
export class TipoProdutoDetailComponent implements OnInit, OnDestroy {

    tipoProduto: TipoProduto;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private tipoProdutoService: TipoProdutoService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTipoProdutos();
    }

    load(id) {
        this.tipoProdutoService.find(id).subscribe((tipoProduto) => {
            this.tipoProduto = tipoProduto;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTipoProdutos() {
        this.eventSubscriber = this.eventManager.subscribe(
            'tipoProdutoListModification',
            (response) => this.load(this.tipoProduto.id)
        );
    }
}
