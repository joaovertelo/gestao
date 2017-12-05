import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TipoProduto } from './tipo-produto.model';
import { TipoProdutoPopupService } from './tipo-produto-popup.service';
import { TipoProdutoService } from './tipo-produto.service';

@Component({
    selector: 'jhi-tipo-produto-dialog',
    templateUrl: './tipo-produto-dialog.component.html'
})
export class TipoProdutoDialogComponent implements OnInit {

    tipoProduto: TipoProduto;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private tipoProdutoService: TipoProdutoService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.tipoProduto.id !== undefined) {
            this.subscribeToSaveResponse(
                this.tipoProdutoService.update(this.tipoProduto));
        } else {
            this.subscribeToSaveResponse(
                this.tipoProdutoService.create(this.tipoProduto));
        }
    }

    private subscribeToSaveResponse(result: Observable<TipoProduto>) {
        result.subscribe((res: TipoProduto) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: TipoProduto) {
        this.eventManager.broadcast({ name: 'tipoProdutoListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-tipo-produto-popup',
    template: ''
})
export class TipoProdutoPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tipoProdutoPopupService: TipoProdutoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.tipoProdutoPopupService
                    .open(TipoProdutoDialogComponent as Component, params['id']);
            } else {
                this.tipoProdutoPopupService
                    .open(TipoProdutoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
