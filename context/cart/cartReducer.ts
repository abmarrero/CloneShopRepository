

import { ICart } from '@/Interfaces/cart';
import { CartState } from './';


type CartActionType = 
 | { type: '[Cart] - LoadCart from cookies | storage',payload: ICart[]} 
 | { type: '[Cart] - Add Product',payload: ICart} 


export const cartReducer = ( state:CartState, action: CartActionType): CartState => {

 switch (action.type) {
  case '[Cart] - LoadCart from cookies | storage':
   return {
    ...state,
   }

  default:
   return state;

 }

}