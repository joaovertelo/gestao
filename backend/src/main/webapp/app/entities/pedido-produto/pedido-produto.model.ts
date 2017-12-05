import { BaseEntity } from './../../shared';

export class PedidoProduto implements BaseEntity {
    constructor(
        public id?: number,
        public quantidade?: number,
        public preco?: number,
        public pedido?: BaseEntity,
        public produto?: BaseEntity,
    ) {
    }
}
