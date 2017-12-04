import { BaseEntity } from './../../shared';

export class Cliente implements BaseEntity {
    constructor(
        public id?: number,
        public nome?: string,
        public dataNasc?: any,
        public telefone?: string,
        public pedidos?: BaseEntity[],
    ) {
    }
}
