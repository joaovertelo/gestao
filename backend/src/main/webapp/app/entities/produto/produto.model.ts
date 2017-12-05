import { BaseEntity } from './../../shared';

export class Produto implements BaseEntity {
    constructor(
        public id?: number,
        public nome?: string,
        public preco?: number,
        public pedidoProdutos?: BaseEntity[],
        public categoria?: BaseEntity,
    ) {
    }
}
