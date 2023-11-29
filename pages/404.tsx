import { ShopLayout } from '@/components/layouts'
import React from 'react'
import {Box,Typography} from '@mui/material'

export const custom404 = () => {
  return (
    <ShopLayout title={'Page not found'} pageDescription={'aqui no hay nada que mostrar'}>
            <Box 
            display='flex' 
            justifyContent='center'
            alignItems='center' 
            height='calc(100vh - 200px)'
            sx={{flexDirection:{xs:'column', sm:'row'}}} 
             
             >
                
              <Typography variant='h1' component='h1' fontSize={80} fontWeight={200}>404 |</Typography>   
              <Typography ml={2}>No encontramos ninguna página</Typography>   
 
            </Box>
    </ShopLayout> 
  )    
}
export default custom404