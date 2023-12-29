

import React, { FC, useEffect, useReducer } from 'react';
import { CartContext, cartReducer } from './';
import { ICart } from '@/Interfaces/cart';
import Cookie from 'js-cookie';
import { OrderSummary } from '../../components/cart/OrderSummary';

export interface CartState {
    isLoaded: boolean;
    cart: ICart[];
    numberOfItems: number;
    subTotal: number;
    tax: number;
    total: number;

    shippingAddress?: ShippingAddress;
}
export interface ShippingAddress {
    firstName: string;
    lastName: string;
    address: string;
    address2?: string;
    zip: string;
    city: string;
    country: string;
    phone: string;
}


const CART_INITIAL_STATE: CartState = {
    isLoaded: false,
    cart: [],
    numberOfItems: 0,
    subTotal: 0,
    tax: 0,
    total: 0,
    shippingAddress: undefined,
}


interface Props {
children?: React.ReactNode | undefined;
}


export const CartProvider:FC<Props>  = ({ children }) => {

    const [state, dispatch] = useReducer( cartReducer , CART_INITIAL_STATE );


    useEffect(() => {
        const cookieProduct = Cookie.get('cart') ? JSON.parse(Cookie.get('cart')!): [];
        dispatch({type: '[Cart] - LoadCart from cookies | storage', payload: [...cookieProduct]}) ;  
    }, [])
    
    
    useEffect(() => {
        if (JSON.stringify(state.cart) !== '[]') {
            const numberOfItems = state.cart.reduce((sum, product) => sum + product.quantity, 0);
            const subTotal = state.cart.reduce((sum, product) => sum + (product.quantity*product.price), 0);
            const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);
            const orderSummary = {
                numberOfItems,
                subTotal,
                tax: taxRate * subTotal,
                total: subTotal*(taxRate + 1)
            }
            console.log(orderSummary);
            console.log(Number(process.env.NEXT_PUBLIC_TAX_RATE ))
            dispatch({ type: '[Cart] - Update order summary', payload: orderSummary})
        }

    }, [state.cart]);

    useEffect(() => {
        if (JSON.stringify(state.cart) !== '[]') {
            Cookie.set('cart', JSON.stringify(state.cart));
        }
       
    }, [state.cart]);

    // useEffect(() => {
    //     localStorage.setItem('cart', JSON.stringify(state.cart)  
    //      )
 
    //  }, [state.cart]) 
    
    
    const addProductToCart =(product:ICart) =>{
        const productInCart = state.cart.some(p => (p._id === product._id));
        if (!productInCart) return dispatch({ type: '[Cart] - Add Product',
                                      payload: [...state.cart,product]})
        const productInCartDifferentSize = state.cart.some(p => (p._id === product._id) &&
                                        (p.sizes === product.sizes));   
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


    const updateQuantityCart =(product:ICart) => {
       dispatch({type: '[Cart] - Update Quantity', payload: product});
    }

    const removeInCart =(product:ICart) => {
        dispatch({type: '[Cart] - Remove Product in Cart', payload: product}); 
        if(state.cart[1] === null || state.cart[1] === undefined){
            Cookie.set('cart', '[]');
            state.numberOfItems=0;
          }    
        
    }

    
  useEffect(() => {
    if (Cookie.get('firstName')){
        const shippingAddress = {
                firstName: Cookie.get('firstName') || '',
                lastName: Cookie.get('lastName') || '',
                address: Cookie.get('address') || '',
                address2: Cookie.get('address2') || '',
                zip: Cookie.get('zip') || '',
                city: Cookie.get('city') || '',
                country: Cookie.get('country') || '',
                phone: Cookie.get('phone') || '',
        }
   dispatch({type:'[Cart] - Load Address from Cookies', payload: shippingAddress});
}
  }, [])
  

    return (
        <CartContext.Provider value={{
           ...state,

           addProductToCart,
           updateQuantityCart,
           removeInCart
        }}>
            { children }
        </CartContext.Provider>
    )

  

};

