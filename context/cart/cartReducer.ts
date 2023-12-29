

import { ICart } from '@/Interfaces/cart';
import { CartState} from './';
import { ShippingAddress } from './CartProvider';


type CartActionType = 
 | { type: '[Cart] - LoadCart from cookies | storage',payload: ICart[]} 
 | { type: '[Cart] - Add Product',payload: ICart[]} 
 | { type: '[Cart] - Update Quantity',payload: ICart} 
 | { type: '[Cart] - Remove Product in Cart',payload: ICart} 
 | { type: '[Cart] - Load Address from Cookies',payload: ShippingAddress} 
 | { type: '[Cart] - Update Address',payload: ShippingAddress} 
 | { type: '[Cart] - Update order summary',payload:  { 
 numberOfItems: number;
 subTotal: number;
 tax: number;
 total: number;
} }
 

export const cartReducer = ( state:CartState, action: CartActionType): CartState => {

 switch (action.type) {
  case '[Cart] - LoadCart from cookies | storage':
   return {
    ...state,
    isLoaded: true,
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

   case '[Cart] - Remove Product in Cart':
   return {
    ...state,
     cart: state.cart.filter( product =>!( product._id === action.payload._id &&
       product.sizes === action.payload.sizes)     
 ),
     
   }

   case '[Cart] - Update order summary':
   return {
    ...state,
    ...action.payload,
   }

   case '[Cart] - Update Address':
   case '[Cart] - Load Address from Cookies':
   return {
    ...state,
    shippingAddress: action.payload,
   }


  default:
   return state;

 }

}