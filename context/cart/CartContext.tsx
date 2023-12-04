

import { ICart } from '@/Interfaces/cart';
import { createContext } from 'react';


interface ContextProps {
    cart: ICart[];

    addProductToCart: (product: ICart) => void;
}


export const CartContext = createContext({} as ContextProps );