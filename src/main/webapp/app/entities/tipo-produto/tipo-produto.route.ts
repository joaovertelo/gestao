import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { TipoProdutoComponent } from './tipo-produto.component';
import { TipoProdutoDetailComponent } from './tipo-produto-detail.component';
import { TipoProdutoPopupComponent } from './tipo-produto-dialog.component';
import { TipoProdutoDeletePopupComponent } from './tipo-produto-delete-dialog.component';

export const tipoProdutoRoute: Routes = [
    {
        path: 'tipo-produto',
        component: TipoProdutoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestaoApp.tipoProduto.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'tipo-produto/:id',
        component: TipoProdutoDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestaoApp.tipoProduto.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tipoProdutoPopupRoute: Routes = [
    {
        path: 'tipo-produto-new',
        component: TipoProdutoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestaoApp.tipoProduto.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tipo-produto/:id/edit',
        component: TipoProdutoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestaoApp.tipoProduto.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tipo-produto/:id/delete',
        component: TipoProdutoDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestaoApp.tipoProduto.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
