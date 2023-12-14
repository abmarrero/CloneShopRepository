

import { AuthLayout } from '@/components/layouts'
import { isEmail } from '@/utils/validations';
import { Box, Button, Grid, Link, TextField, Typography } from '@mui/material'
import React from 'react'
import { useForm } from 'react-hook-form';

type Inputs = {
    email: string,
    password: string,
  };
  
  const LoginPage = () => {
      const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
      
        const onLoginUser = (data:Inputs) => {
          console.log({data});
        };
  return (
    <AuthLayout title={'Ingresar'} >
        <form onSubmit={handleSubmit(onLoginUser)} noValidate>
        <Box sx={{width:350, padding: '10px 20px'}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant='h1' component='h1'>Iniciar Sesión</Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField type="email" {...register('email',{
                    required: 'Este campo es requerido',
                    validate: (val) => isEmail(val)
                    })}
                    error={!!errors.email}
                    helperText={errors.email?.message}    
                    label='Correo' variant='filled' fullWidth></TextField>
                </Grid>
                <Grid item xs={12}>
                    <TextField {...register('password',{
                    required: 'Este campo es requerido',
                    minLength: {value: 6,message: 'Debe tener al menos 6 caracteres'}
                    })}
                    error={!!errors.password}
                    helperText={errors.password?.message}  
                    label='Contraseña' type='password' variant='filled' fullWidth></TextField>
                </Grid>
                <Grid item xs={12}>
                    <Button type='submit' color='secondary' className='circular-btn' fullWidth size='large'>
                        Ingresar
                    </Button>
                </Grid>
                <Grid item xs={12} display='flex' justifyContent='end'>
                    <Link href='/auth/register' style={{textDecoration:'underline'}}>
                        ¿No tienes cuenta?
                    </Link>
                </Grid>
            </Grid>
        </Box>
        </form>
    </AuthLayout>
  )
}

export default LoginPage