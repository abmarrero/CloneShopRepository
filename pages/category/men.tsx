


import { ShopLayout } from '@/components/layouts';
import { Typography } from '@mui/material';
import { NextPage } from 'next';

import { ProductList } from '@/components/products';
import { useProducts } from '@/hooks/useProducts';
import { FullScreenLoading } from '@/components/ui';






const MenPage: NextPage=()=> {

    const {products,isloading} = useProducts('/products?gender=men');

  return (
    
    <ShopLayout title={'Clone-Shop - Mens'} pageDescription={'Encuentra los mejores producto de CLone aqui'}>

    <Typography variant='h1' component='h1'>Tienda</Typography>
    <Typography variant='h2' sx={{ mb: 1 }}>Productos para ellos</Typography>
      
      
        {
          isloading
          ? <FullScreenLoading/>
          :<ProductList products={products} />
          
        }



    </ShopLayout>

  )
}
export default MenPage;