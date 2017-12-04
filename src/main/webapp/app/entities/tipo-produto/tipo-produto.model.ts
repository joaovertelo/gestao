import { BaseEntity } from './../../shared';

export class TipoProduto implements BaseEntity {
    constructor(
        public id?: number,
        public nome?: string,
    ) {
    }
}
