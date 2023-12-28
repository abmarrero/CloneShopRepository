

import { ShopLayout } from '@/components/layouts'
import { countries, jwtex } from '@/utils'
import { Box, Button, FormControl, Grid, MenuItem, Select, TextField, Typography } from '@mui/material'
import { GetServerSideProps } from 'next'
import React from 'react'

type FormData = {
    firsName: string;
    lastName: string;
    address: string;
    address2?: string;
    zip: string;
    city: string;
    country: string;
    phone: string;
}


const AdressPage = () => {
  return (
    <ShopLayout title={'Dirección'} pageDescription={'Confirmar dirección del destino'}  >
        <Typography variant='h1' component='h1'>Dirección</Typography> 
        <Grid container spacing={2} sx={{mt: 2}}>
            <Grid item xs={12} sm={6}>
                <TextField label='Nombre' variant='filled' fullWidth></TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField label='apellido' variant='filled' fullWidth></TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField label='Dirección' variant='filled' fullWidth></TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField label='Dirección 2 (opcional)' variant='filled' fullWidth></TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField label='Código Postal' variant='filled' fullWidth></TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField label='Ciudad' variant='filled' fullWidth></TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                    <Select
                    variant='filled'
                    label='País'
                    value={'CUB'}
                    >
                        {
                            countries.map(country => (

                                <MenuItem key={country.code} value={country.code}>
                                    {country.name}
                                </MenuItem>      
                            ))
                        }
                      <MenuItem value={2}>Honduras</MenuItem>      
                      <MenuItem value={3}>El Salvador</MenuItem>      
                      <MenuItem value={4}>México</MenuItem>      
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField label='Teléfono' variant='filled' fullWidth></TextField>
            </Grid>
        </Grid>
        <Box sx={{mt: 5}} display='flex' justifyContent='center'>
            <Button color='secondary' size='large' className='circular-btn'>
                Revisar Pedido
            </Button>
        </Box>
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
                destination:'/auth/login?p=/checkout/address',
                permanent:false,
            }
        }
    }

          return {
        props: {
           
        }

    }

  }


export default AdressPage




