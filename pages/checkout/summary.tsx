
import { CartList, OrderSummary } from '@/components/cart'
import { ShopLayout } from '@/components/layouts'
import { CartContext } from '@/context'
import { jwtex } from '@/utils'
import { Box, Button, Card, CardContent, Divider, Grid, Link, Typography } from '@mui/material'
import { GetServerSideProps } from 'next'
import React, { useContext } from 'react'
import { countries } from '../../utils/countries';

const SummaryCheckout = () => {

    const {shippingAddress, numberOfItems } = useContext(CartContext)

    

        if (!shippingAddress){
            return <></>
        }

  return (
    <ShopLayout title={'Resumen de orden'} pageDescription={'Resumen de la orden'} >
        <Typography variant='h1' component='h1'>Resumen de la orden</Typography>
    <Grid container>
        <Grid item xs={12} sm={7}>
            <CartList />
        </Grid>
        <Grid item xs={12} sm={5}>
            <Card className='summary-card'>
                <CardContent >
                    <Typography variant='h2'>Orden ({numberOfItems} {numberOfItems===1?'producto':'productos' } )</Typography>
                    <Divider sx={{my: 2}}/>
                    <Box display='flex' justifyContent='end'>
                    <Link href='/checkout/address' style={{textDecoration: 'underline'}}>Editar</Link>
                    </Box>
                        <Typography variant='subtitle1'>Dirección de entrega</Typography>
                        <Typography >{shippingAddress.firstName} {shippingAddress.lastName}</Typography> 
                        <Typography >
                          {shippingAddress.address}{shippingAddress.address2? `,${shippingAddress.address2}`:''}
                        </Typography>
                        <Typography >{shippingAddress.city}</Typography>
                        <Typography >{countries.find(c => c.code===shippingAddress.country)?.name}</Typography>
                        <Typography >{shippingAddress.phone}</Typography>
                        <Divider sx={{my: 2}}/>
                        <Box display='flex' justifyContent='end'>
                            <Link href='/cart' style={{textDecoration: 'underline'}}>Editar</Link>
                    </Box>
                    <OrderSummary/>
                    <Box sx={{mt: 3}}>
                        <Button color='secondary' fullWidth className='circular-btn'>
                            Confirmar Orden
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Grid>
    </Grid>
    </ShopLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({req}) => {

    const {token=''}= req.cookies;

   
    let isValidToken = false;
   
    try {
    await jwtex.validarTokenJWT(token.toString()) ;
    isValidToken = true;

    } catch (error) {
        isValidToken = false;
    }

    if(!isValidToken){
        return {
            redirect: {
                destination:'/auth/login?p=/checkout/summary',
                permanent:false,
            }
        }
    }

          return {
        props: {
           
        }

    }

  }


export default SummaryCheckout