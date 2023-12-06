
import { Box, Button, Card, CardActionArea, CardMedia, Grid, Link, Typography } from '@mui/material';
import { initialData } from '../../database/products';
import { ItemCounter } from '../ui';
import { FC, useContext } from 'react';
import { CartContext } from '../../context/cart/CartContext';



    
interface Props{
    editable?: boolean
}


export const CartList:FC<Props> = ({editable = false}) => {

    const { cart } = useContext(CartContext);
    
  return (
    <>
        {
            cart.map( product => (
                console.log(product.image),
                <Grid container spacing={2} key={product.slug} sx={{mb: 1}}>
                    <Grid item xs={3} >
                    
                        <Link href='/product/slug'>
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
                            <Typography variant='body1'>Talla:<strong>M</strong></Typography>
                            {
                                editable
                                ?<ItemCounter 
                                currentValue={product.quantity} 
                                MaxValue={10} 
                                updateQuantity={ () => {}}
                                    />
                                :<Typography variant='h5'>{product.quantity} {product.quantity>1}?'productos':'producto'</Typography>
                            } 
                                
                        </Box>
                    </Grid>
                    <Grid item xs={2}>
                    <Typography variant='subtitle1'>{`$${product.price}`}</Typography>
                    {
                        editable && (
                            <Button color='secondary' variant='text'>Remover</Button>
                            )

                    }

                    </Grid>
                </Grid>
            ))
        }
    </>
  )
}
