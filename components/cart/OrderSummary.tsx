
import { Grid, Typography } from '@mui/material'
import React from 'react'

export const OrderSummary = () => {
  return (
    <Grid container>
        <Grid item xs={6}>
            <Typography>No. Productos</Typography>
        </Grid>
        <Grid item xs={6} display='flex' justifyContent='end'>
        <Typography>3 items</Typography>
        </Grid>
        <Grid item xs={6}>
        <Typography>Subtotal</Typography>
        </Grid>
        <Grid item xs={6} display='flex' justifyContent='end'>
        <Typography>{`$${135.43}`}</Typography>
        </Grid>
        <Grid item xs={6}>
        <Typography>Impuestos (15%)</Typography>
        </Grid>
        <Grid item xs={6} display='flex' justifyContent='end'>
        <Typography>{`$${25.03}`}</Typography>
        </Grid>
        <Grid item xs={6} sx={{mt: 2}}>
        <Typography variant='subtitle1'>Total:</Typography>
        </Grid>
        <Grid item sx={{mt: 2}} xs={6} display='flex' justifyContent='end'>
        <Typography variant='subtitle1'>{`$${164.13}`}</Typography>
        </Grid>
    </Grid>
  )
}
