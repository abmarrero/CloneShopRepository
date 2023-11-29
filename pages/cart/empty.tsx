

import { ShopLayout } from '@/components/layouts'
import { RemoveShoppingCartOutlined } from '@mui/icons-material'
import { Box, Typography } from '@mui/material'
import Link from 'next/link'
import React from 'react'

const EmptyCart = () => {
  return (
    <ShopLayout title={'carrito vacio'} pageDescription={'No hay articulos en el carrito de compras'}>
            <Box 
            display='flex' 
            justifyContent='center'
            alignItems='center' 
            height='calc(100vh - 200px)'
            sx={{flexDirection:{xs:'column', sm:'row'}}} 
             
             >
                <RemoveShoppingCartOutlined sx={{fontSize: 100}}/>
                <Box sx={{underline:'none'}} display='flex' flexDirection='column' alignItems='center'>
              <Typography >Su carrito está vacío</Typography>   
                <Link href='../' style={{textDecoration: 'none'}}>
                  <Typography variant='h4' color='secondary'>
                  Regresar
                  </Typography>

                </Link>
                </Box>
                 
 
            </Box>
    </ShopLayout> 
  )
}

export default EmptyCart