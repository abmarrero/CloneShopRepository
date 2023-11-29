


import { ShopLayout } from '@/components/layouts';
import { Typography } from '@mui/material';
import { NextPage } from 'next';

import { ProductList } from '@/components/products';
import { useProducts } from '@/hooks/useProducts';
import { FullScreenLoading } from '@/components/ui';






const KidPage: NextPage=()=> {

    const {products,isloading} = useProducts('/products?gender=kid');

  return (
    
    <ShopLayout title={'Clone-Shop - Kids'} pageDescription={'Encuentra los mejores producto de CLone aqui'}>

    <Typography variant='h1' component='h1'>Niños</Typography>
    <Typography variant='h2' sx={{ mb: 1 }}>Productos para niños</Typography>
      
      
        {
          isloading
          ? <FullScreenLoading/>
          :<ProductList products={products} />
          
        }



    </ShopLayout>

  )
}
export default KidPage;