import { ISizes } from './';


export interface ICart {
    _id: string;
    image: string;
    price: number;
    sizes?: ISizes;
    slug: string;
    title: string;
    gender: 'men'|'women'|'kid'|'unisex'
    quantity: number;

}