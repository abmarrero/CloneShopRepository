import { CartList, OrderSummary } from '@/components/cart'
import { ShopLayout } from '@/components/layouts'
import { CartContext } from '@/context'
import { Box, Button, Card, CardContent, Divider, Grid, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import React, { useContext, useEffect } from 'react'

const CartPage = () => {
    const {isLoaded,cart} = useContext(CartContext)
    const router = useRouter();

    useEffect(() => {
      if( isLoaded && cart.length === 0 )  
        router.replace('cart/empty')
    }, [isLoaded,router,cart])
    
    if( !isLoaded || cart.length===0 )  
        return (<></>)
  return (
    <ShopLayout title={'carrito-3'} pageDescription={'carrito de compras de la tienda'} >
        <Typography variant='h1' component='h1'>Carrito</Typography>
    <Grid container>
        <Grid item xs={12} sm={7}>
            <CartList editable/>
        </Grid>
        <Grid item xs={12} sm={5}>
            <Card className='summary-card'>
                <CardContent >
                    <Typography variant='h2'>Orden</Typography>
                    <Divider sx={{my: 2}}/>
                    <OrderSummary/>
                    <Box sx={{mt: 3}}>
                        <Button color='secondary' 
                                fullWidth 
                                className='circular-btn'
                                href='/checkout/address'
                                >
                            Checkout
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Grid>
    </Grid>
    </ShopLayout>
  )
}

export default CartPage