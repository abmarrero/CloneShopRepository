

import { ICart } from '@/Interfaces/cart';
import { createContext } from 'react';


interface ContextProps {
    cart: ICart;
}


export const CartContext = createContext({} as ContextProps );