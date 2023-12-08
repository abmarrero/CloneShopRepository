
import { CartContext } from '@/context'
import { currency } from '@/utils'
import { Grid, Typography } from '@mui/material'
import React, { useContext } from 'react'

export const OrderSummary = () => {

  const {numberOfItems, tax, subTotal, total} = useContext(CartContext)

  return (
    <Grid container>
        <Grid item xs={6}>
            <Typography>No. Productos</Typography>
        </Grid>
        <Grid item xs={6} display='flex' justifyContent='end'>
        <Typography>{numberOfItems} {numberOfItems>1? 'productos':'producto'}</Typography>
        </Grid>
        <Grid item xs={6}>
        <Typography>Subtotal</Typography>
        </Grid>
        <Grid item xs={6} display='flex' justifyContent='end'>
        <Typography>{currency.format(subTotal)}</Typography>
        </Grid>
        <Grid item xs={6}>
        <Typography>Impuestos (15%)</Typography>
        </Grid>
        <Grid item xs={6} display='flex' justifyContent='end'>
        <Typography>{currency.format(tax)}</Typography>
        </Grid>
        <Grid item xs={6} sx={{mt: 2}}>
        <Typography variant='subtitle1'>Total:</Typography>
        </Grid>
        <Grid item sx={{mt: 2}} xs={6} display='flex' justifyContent='end'>
        <Typography style={{ fontWeight:'600'}}>{currency.format(total)}</Typography>
        </Grid>
    </Grid>
  )
}
