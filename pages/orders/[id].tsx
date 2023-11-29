
import { CartList, OrderSummary } from '@/components/cart'
import { ShopLayout } from '@/components/layouts'
import { CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material'
import { Box, Button, Card, CardContent, Chip, Divider, Grid, Link, Typography } from '@mui/material'
import React from 'react'

const OrderPage = () => {
  return (
    <ShopLayout title={'Resumen de orden 124342'} pageDescription={'Resumen de la orden'} >
        <Typography variant='h1' component='h1'>Orden: 1243424</Typography>
        {/* <Chip
        sx={{my: 2}}
        label='Pendiente de Pago'
        variant='outlined'
        color='error'
        icon={<CreditCardOffOutlined/>}
        /> */}
        <Chip
        sx={{my: 2}}
        label='Pagada'
        variant='outlined'
        color='success'
        icon={<CreditScoreOutlined/>}
        />
    <Grid container>
        <Grid item xs={12} sm={7}>
            <CartList />
        </Grid>
        <Grid item xs={12} sm={5}>
            <Card className='summary-card'>
                <CardContent >
                    <Typography variant='h2'>Orden</Typography>
                    <Divider sx={{my: 2}}/>
                    <Box display='flex' justifyContent='end'>
                    <Link href='/checkout/address' style={{textDecoration: 'underline'}}>editar</Link>
                    </Box>
                        <Typography variant='subtitle1'>Dirección de entrega</Typography>
                        <Typography >Abel Marrero</Typography>
                        <Typography >323 algun lugar</Typography>
                        <Typography >Villa Clara</Typography>
                        <Typography >Cuba</Typography>
                        <Typography >+53 324143</Typography>
                        <Divider sx={{my: 2}}/>
                        <Box display='flex' justifyContent='end'>
                    <Link href='/cart' style={{textDecoration: 'underline'}}>editar</Link>
                    </Box>
                    <OrderSummary/>
                    <Box sx={{mt: 3}}>
                        <h1>Pagar</h1>
                        <Chip
                            sx={{my: 2}}
                            label='Pagada'
                            variant='outlined'
                            color='success'
                            icon={<CreditScoreOutlined/>}
                            />
                    </Box>
                </CardContent>
            </Card>
        </Grid>
    </Grid>
    </ShopLayout>
  )
}

export default OrderPage