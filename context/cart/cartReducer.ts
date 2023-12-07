

import { ICart } from '@/Interfaces/cart';
import { CartState } from './';


type CartActionType = 
 | { type: '[Cart] - LoadCart from cookies | storage',payload: ICart[]} 
 | { type: '[Cart] - Add Product',payload: ICart[]} 
 | { type: '[Cart] - Update Quantity',payload: ICart} 


export const cartReducer = ( state:CartState, action: CartActionType): CartState => {

 switch (action.type) {
  case '[Cart] - LoadCart from cookies | storage':
   return {
    ...state,
    cart: [ ...action.payload]
   }

   case '[Cart] - Add Product':
   return {
    ...state,
     cart: [ ...action.payload]
   }

   case '[Cart] - Update Quantity':
   return {
    ...state,
     cart: state.cart.map( product =>{
            if(product._id !== action.payload._id) return product;
            if(product.sizes !== action.payload.sizes) return product;
            return action.payload
     })
   }

  default:
   return state;

 }

}