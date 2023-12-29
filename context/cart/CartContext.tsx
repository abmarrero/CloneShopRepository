

import { ICart } from '@/Interfaces/cart';
import { createContext } from 'react';
import { ShippingAddress } from './CartProvider';


interface ContextProps {
    isLoaded: boolean;
    cart: ICart[];
    numberOfItems: number;
    subTotal: number;
    tax: number;
    total: number;

    shippingAddress?: ShippingAddress;

    addProductToCart: (product: ICart) => void;
    updateQuantityCart:  (product: ICart) => void;
    removeInCart: (product: ICart) => void;
    updateAddress: (address: ShippingAddress) => void;
}


export const CartContext = createContext({} as ContextProps );