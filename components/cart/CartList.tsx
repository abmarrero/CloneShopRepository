
import { Box, Button, Card, CardActionArea, CardMedia, Grid, Link, Typography } from '@mui/material';

import { ItemCounter } from '../ui';
import { FC, useContext } from 'react';
import { CartContext } from '../../context/cart/CartContext';
import { ICart } from '@/Interfaces';
import Cookie from 'js-cookie';


    
interface Props{
    editable?: boolean
}


export const CartList:FC<Props> = ({editable = false}) => {
    
    const { cart , updateQuantityCart, removeInCart } = useContext(CartContext);

    const onUpdateQuantity =(product: ICart, newValue:number) =>{
        product.quantity = newValue;
        updateQuantityCart(product);
        
    }
    const onRemoveInCart =(product: ICart) =>{
        
        removeInCart(product);
        // console.log('primera' , cart);
        if(cart[1] === null || cart[1] === undefined)
        Cookie.set('cart', '[]')
    }
    // const onRemove =() =>{
        
    //     if(JSON.stringify(cart)==='[]')
    //         Cookie.set('cart', '[]');
    //         // console.log('segunda' , cart);
    // }
    
  return (
    <>
        {
            cart.map( product => (
                
                <Grid container spacing={2} key={product.slug + product.sizes} sx={{mb: 1}}>
                    <Grid item xs={3} >
                    
                        <Link href={`/product/${product.slug}`}>
                            <CardActionArea>
                                <CardMedia
                                component='img'
                                image={`/products/${product.image}`}
                                sx={{borderRadius: '5px'}}
                                />                                
                            </CardActionArea>
                        </Link>
                       
                    </Grid>
                    <Grid item xs={7}>
                        <Box display='flex' flexDirection='column'>
                            <Typography variant='body1'>{product.title}</Typography>
                            <Typography variant='body1'>Talla:<strong>{product.sizes}</strong></Typography>
                            {
                                editable
                                ?<ItemCounter 
                                currentValue={product.quantity} 
                                MaxValue={10} 
                                updateQuantity={ (newValue) => {onUpdateQuantity(product,newValue)}}
                                    />
                                :<Typography variant='h5'>{product.quantity} {product.quantity>1 ? 'productos':'producto'}</Typography>
                            } 
                                
                        </Box>
                    </Grid>
                    <Grid item xs={2}>
                    <Typography variant='subtitle1'>{`$${product.price}`}</Typography>
                    {
                        editable && (
                            <Button color='secondary' variant='text'
                             onClick={() => {
                                onRemoveInCart(product)
                               
                            }}>Remover</Button>
                            )

                    }

                    </Grid>
                </Grid>
            ))
        }
    </>
  )
}
