
import { CartList, OrderSummary } from '@/components/cart'
import { ShopLayout } from '@/components/layouts'
import { Box, Button, Card, CardContent, Divider, Grid, Link, Typography } from '@mui/material'
import React from 'react'

const SummaryCheckout = () => {
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
                    <Typography variant='h2'>Orden</Typography>
                    <Divider sx={{my: 2}}/>
                    <Box display='flex' justifyContent='end'>
                    <Link href='/checkout/address' style={{textDecoration: 'underline'}}>Editar</Link>
                    </Box>
                        <Typography variant='subtitle1'>Dirección de entrega</Typography>
                        <Typography >Abel Marrero</Typography>
                        <Typography >323 algun lugar</Typography>
                        <Typography >Villa Clara</Typography>
                        <Typography >Cuba</Typography>
                        <Typography >+53 324143</Typography>
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

export default SummaryCheckout