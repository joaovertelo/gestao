import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TipoProduto } from './tipo-produto.model';
import { TipoProdutoPopupService } from './tipo-produto-popup.service';
import { TipoProdutoService } from './tipo-produto.service';

@Component({
    selector: 'jhi-tipo-produto-delete-dialog',
    templateUrl: './tipo-produto-delete-dialog.component.html'
})
export class TipoProdutoDeleteDialogComponent {

    tipoProduto: TipoProduto;

    constructor(
        private tipoProdutoService: TipoProdutoService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.tipoProdutoService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'tipoProdutoListModification',
                content: 'Deleted an tipoProduto'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-tipo-produto-delete-popup',
    template: ''
})
export class TipoProdutoDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tipoProdutoPopupService: TipoProdutoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.tipoProdutoPopupService
                .open(TipoProdutoDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
