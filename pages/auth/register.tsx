



import { AuthLayout } from '@/components/layouts'
import { Box, Button, Grid, Link, TextField, Typography } from '@mui/material'
import React from 'react'

const RegisterPage = () => {
  return (
    <AuthLayout title={'Registrarse'} >
        <Box sx={{width:350, padding: '10px 20px'}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant='h1' component='h1'>Iniciar Sesión</Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField label='Nombre Completo' variant='filled' fullWidth></TextField>
                </Grid>
                <Grid item xs={12}>
                    <TextField label='Correo' variant='filled' fullWidth></TextField>
                </Grid>

                <Grid item xs={12}>
                    <TextField label='Contraseña' type='password' variant='filled' fullWidth></TextField>
                </Grid>
                <Grid item xs={12}>
                    <Button color='secondary' className='circular-btn' fullWidth size='large'>
                        Ingresar
                    </Button>
                </Grid>
                <Grid item xs={12} display='flex' justifyContent='end'>
                    <Link href='/auth/login' style={{textDecoration:'underline'}}>
                        ¿Ya tines cuenta?
                    </Link>
                </Grid>
            </Grid>
        </Box>

    </AuthLayout>
  )
}

export default RegisterPage