import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { PedidoProdutoComponent } from './pedido-produto.component';
import { PedidoProdutoDetailComponent } from './pedido-produto-detail.component';
import { PedidoProdutoPopupComponent } from './pedido-produto-dialog.component';
import { PedidoProdutoDeletePopupComponent } from './pedido-produto-delete-dialog.component';

export const pedidoProdutoRoute: Routes = [
    {
        path: 'pedido-produto',
        component: PedidoProdutoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestaoApp.pedidoProduto.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'pedido-produto/:id',
        component: PedidoProdutoDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestaoApp.pedidoProduto.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const pedidoProdutoPopupRoute: Routes = [
    {
        path: 'pedido-produto-new',
        component: PedidoProdutoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestaoApp.pedidoProduto.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'pedido-produto/:id/edit',
        component: PedidoProdutoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestaoApp.pedidoProduto.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'pedido-produto/:id/delete',
        component: PedidoProdutoDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestaoApp.pedidoProduto.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
