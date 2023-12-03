

import React, { FC, useReducer } from 'react';
import { CartContext, cartReducer } from './';
import { ICart } from '@/Interfaces/cart';


export interface CartState {
    cart: ICart[];
}


const CART_INITIAL_STATE: CartState = {
    cart: [],
}


interface Props {
children?: React.ReactNode | undefined;
}


export const CartProvider:FC<Props>  = ({ children }) => {

    const [state, dispatch] = useReducer( cartReducer , CART_INITIAL_STATE );

    return (<CartContext.Provider value={{
           ...state
        }}>
            { children }
        </CartContext.Provider>
    )
};