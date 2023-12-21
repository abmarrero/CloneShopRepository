

import { cloneApi } from '@/api';
import { AuthLayout } from '@/components/layouts'
import { isEmail } from '@/utils/validations';
import { Box, Button, Chip, Grid, Link, TextField, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form';

import { ErrorOutline } from '@mui/icons-material';
import { AuthContext } from '../../context/auth/AuthContext';
import router, { useRouter } from 'next/router';

type Inputs = {
    email: string,
    password: string,
  };
  
  const LoginPage = () => {
      const router = useRouter();
      const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

      const { loginUser } = useContext(AuthContext);
      const [showError, setShowError] = useState(false);
      const [botonBloqueado, setBotonBloqueado] = useState(false);
        
      const onLoginUser = async({email, password}:Inputs) => {
            setShowError(false);
            const isValidLogin = await loginUser(email, password);    

            if(!isValidLogin){   
                setBotonBloqueado(true);
                setShowError(true);
                setTimeout(() => setShowError(false), 2000);   
                setTimeout(() => {
                    setBotonBloqueado(false); // Desbloquear el botón después de 3 segundos
                  }, 1000);
                  return;
            }
            const destination = router.query.p?.toString() || '/';
            router.replace(destination);
        }
       
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