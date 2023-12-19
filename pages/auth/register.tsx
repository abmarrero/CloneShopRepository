

import { cloneApi } from '@/api';
import { AuthLayout } from '@/components/layouts'
import { isEmail } from '@/utils/validations';
import { ErrorOutline } from '@mui/icons-material';
import { Box, Button, Chip, Grid, Link, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';

type FormData = {
    email: string;
    password: string;
    name: string;
  };

const RegisterPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

    const [showError, setShowError] = useState(false)
    const [botonBloqueado, setBotonBloqueado] = useState(false);

    const onRegisterForm = async( {email, password, name}:FormData) => {
        setShowError(false);
        try {
           
            const {data} = await cloneApi.post('/user/register', {email, password, name});
            const {token, user} = data;
            console.log({user, token});
        } catch (error) {
            console.log('Error en las credenciales');
            setBotonBloqueado(true);
            setShowError(true);
            setTimeout(() => setShowError(false), 2000);
            // if(axios.isAxiosError(error)) {
            //     error.message;
            // }    
            setTimeout(() => {
                setBotonBloqueado(false); // Desbloquear el botón después de 3 segundos
              }, 1000);
            }
    }

  return (
    <AuthLayout title={'Registrarse'} >
        <form onSubmit={handleSubmit(onRegisterForm)} noValidate>
        <Box sx={{width:350, padding: '10px 20px'}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant='h1' component='h1'>Iniciar Sesión</Typography>
                </Grid>
                <Grid item xs={12}>
                <TextField {...register('name',{
                    required: 'Este campo es requerido',
                    minLength: {value: 2,message: 'Debe tener al menos 2 caracteres'}
                    })}
                    error={!!errors.name}
                    helperText={errors.name?.message}  
                    label='Nombre Completo' variant='filled' fullWidth></TextField>
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
                    <Button type='submit' color='secondary' className='circular-btn' fullWidth size='large' 
                    disabled = {botonBloqueado ? true : false}
                    >
                        Ingresar
                    </Button>
                </Grid>
                <Grid item xs={12}>
                <Chip
                    label= 'No reconocemos ese usuario/contraseña'
                    color='error'
                    icon={<ErrorOutline/>}
                    className='fadeIn'
                    sx={{display:showError ? 'flex' : 'none'}}
                    />
                </Grid>
                <Grid item xs={12} display='flex' justifyContent='end'>
                    <Link href='/auth/login' style={{textDecoration:'underline'}}>
                        ¿Ya tines cuenta?
                    </Link>
                </Grid>
            </Grid>
        </Box>
        </form>
    </AuthLayout>
  )
}

export default RegisterPage