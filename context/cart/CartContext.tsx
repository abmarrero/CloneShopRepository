

import { ICart } from '@/Interfaces/cart';
import { createContext } from 'react';


interface ContextProps {
    cart: ICart[];
    numberOfItems: number;
    subTotal: number;
    tax: number;
    total: number;

    addProductToCart: (product: ICart) => void;
    updateQuantityCart:  (product: ICart) => void;
    removeInCart: (product: ICart) => void;
}


export const CartContext = createContext({} as ContextProps );