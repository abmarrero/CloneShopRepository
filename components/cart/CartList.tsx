
import { Box, Button, Card, CardActionArea, CardMedia, Grid, Link, Typography } from '@mui/material';
import { initialData } from '../../database/products';
import { ItemCounter } from '../ui';
import { FC } from 'react';


const productInCart= [

    initialData.products[0],
    initialData.products[1],
    initialData.products[2],
]
    
interface Props{
    editable?: boolean
}


export const CartList:FC<Props> = ({editable}) => {
  return (
    <>
        {
            productInCart.map( product => (
                <Grid container spacing={2} key={product.slug} sx={{mb: 1}}>
                    <Grid item xs={3} >
                        
                        <Link href='/product/slug'>
                            <CardActionArea>
                                <CardMedia
                                image={`/products/${product.images[0]}`}
                                component='img'
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
                                ?<ItemCounter/>
                                :<Typography variant='h5'>3 Items</Typography>
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
