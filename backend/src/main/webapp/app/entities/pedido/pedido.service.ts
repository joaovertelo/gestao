import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Pedido } from './pedido.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class PedidoService {

    private resourceUrl = SERVER_API_URL + 'api/pedidos';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/pedidos';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(pedido: Pedido): Observable<Pedido> {
        const copy = this.convert(pedido);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(pedido: Pedido): Observable<Pedido> {
        const copy = this.convert(pedido);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Pedido> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    search(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceSearchUrl, options)
            .map((res: any) => this.convertResponse(res));
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to Pedido.
     */
    private convertItemFromServer(json: any): Pedido {
        const entity: Pedido = Object.assign(new Pedido(), json);
        entity.data = this.dateUtils
            .convertDateTimeFromServer(json.data);
        return entity;
    }

    /**
     * Convert a Pedido to a JSON which can be sent to the server.
     */
    private convert(pedido: Pedido): Pedido {
        const copy: Pedido = Object.assign({}, pedido);

        copy.data = this.dateUtils.toDate(pedido.data);
        return copy;
    }
}
