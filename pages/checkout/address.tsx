

import { ShopLayout } from '@/components/layouts'
import { countries, jwtex } from '@/utils'
import { Box, Button, FormControl, Grid, MenuItem, Select, TextField, Typography } from '@mui/material'
import { GetServerSideProps } from 'next'
import React from 'react'
import { useForm } from 'react-hook-form'
import Cookie from 'js-cookie';
import { useRouter } from 'next/router'

type FormData = {
    firstName: string;
    lastName: string;
    address: string;
    address2?: string;
    zip: string;
    city: string;
    country: string;
    phone: string;
}


const AdressPage = () => {

    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        defaultValues: {
            firstName:'',
            lastName:'',
            address:'',
            address2:'',
            zip:'',
            city:'',
            country:countries[0].code,
            phone:'',
        },
    });
    const onAddressSubmit = (data:FormData) => {
        console.log(data);
        Cookie.set('firstName',data.firstName);
        Cookie.set('lastName',data.lastName);
        Cookie.set('address',data.address);
        Cookie.set('address2',data.address2 || '');
        Cookie.set('zip',data.zip);
        Cookie.set('city',data.city);
        Cookie.set('country',data.country);
        Cookie.set('phone',data.phone);

        router.push('/checkout/summary');
    }

  return (
    <ShopLayout title={'Dirección'} pageDescription={'Confirmar dirección del destino'}  >
         <form onSubmit={handleSubmit(onAddressSubmit)} >

        <Typography variant='h1' component='h1'>Dirección</Typography> 
        <Grid container spacing={2} sx={{mt: 2}}>
            <Grid item xs={12} sm={6}>
                <TextField label='Nombre' variant='filled' fullWidth
                 {...register('firstName',{
                    required: 'Este campo es requerido',
                    })}
                    error={!!errors.firstName}
                    helperText={errors.firstName?.message} 
                ></TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField label='apellido' variant='filled' fullWidth
                {...register('lastName',{
                    required: 'Este campo es requerido',
                    })}
                    error={!!errors.lastName}
                    helperText={errors.lastName?.message} 
                ></TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField label='Dirección' variant='filled' fullWidth
                {...register('address',{
                    required: 'Este campo es requerido',
                    })}
                    error={!!errors.address}
                    helperText={errors.address?.message} 
                ></TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField label='Dirección 2 (opcional)' variant='filled' fullWidth
                {...register('address2')}
                ></TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField label='Código Postal' variant='filled' fullWidth
                {...register('zip',{
                    required: 'Este campo es requerido',
                    })}
                    error={!!errors.zip}
                    helperText={errors.zip?.message} 
                ></TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField label='Ciudad' variant='filled' fullWidth
                {...register('city',{
                    required: 'Este campo es requerido',
                    })}
                    error={!!errors.city}
                    helperText={errors.city?.message} 
                ></TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                    <TextField
                    select
                    variant='filled'
                    label='País'
                    defaultValue={countries[0].code}
                    {...register('country',{
                        required: 'Este campo es requerido',
                        })}
                        error={!!errors.country}
                        helperText={errors.country?.message} 
                    >
                        {
                            countries.map(country => (

                                <MenuItem key={country.code} value={country.code}>
                                    {country.name}
                                </MenuItem>      
                            ))
                        }   
                    </TextField>
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField label='Teléfono' variant='filled' fullWidth
                {...register('phone',{
                    required: 'Este campo es requerido',
                    })}
                    error={!!errors.phone}
                    helperText={errors.phone?.message} 
                ></TextField>
            </Grid>
        </Grid>
        <Box sx={{mt: 5}} display='flex' justifyContent='center'>
            <Button color='secondary' size='large' className='circular-btn' type='submit'>
                Revisar Pedido
            </Button>
        </Box>
        </form>
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




