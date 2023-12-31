
import { ShopLayout } from '@/components/layouts';
import { Typography } from '@mui/material';
import { NextPage } from 'next';

import { ProductList } from '@/components/products';
import { useProducts } from '@/hooks/useProducts';
import { FullScreenLoading } from '@/components/ui';






const Home: NextPage=()=> {

    const {products,isloading} = useProducts('/products');

  return (
    
    <ShopLayout title={'Clone-Shop - Home'} pageDescription={'Encuentra los mejores producto de CLone aqui'}>

    <Typography variant='h1' component='h1'>Tienda</Typography>
    <Typography variant='h2' sx={{ mb: 1 }}>Todos los productos</Typography>
      
      
        {
          isloading
          ? <FullScreenLoading/>
          :<ProductList products={products} />
          
        }



    </ShopLayout>

  )
}
export default Home;