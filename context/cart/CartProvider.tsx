

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
    
    const addProductToCart =(product:ICart) =>{
        const productInCart = state.cart.some(p => p._id === product._id);
        if (!productInCart) return dispatch({ type: '[Cart] - Add Product',
                                      payload: [...state.cart,product]})
        const productInCartDifferentSize = state.cart.some(p => p._id === product._id &&
                                        p.sizes === product.sizes);   
        if (!productInCartDifferentSize)  return dispatch({ type: '[Cart] - Add Product',
                                                payload: [...state.cart,product]})    
                                                
        const updatedProducts = state.cart.map(p =>{

            if(p._id !== product._id) return p;
            if(p.sizes !== product.sizes) return p;

            p.quantity += product.quantity;
            return p;

    })        
    dispatch({ type: '[Cart] - Add Product', payload: [...updatedProducts]}) 

    }

    return (
        <CartContext.Provider value={{
           ...state,

           addProductToCart,
        }}>
            { children }
        </CartContext.Provider>
    )
};