


import { ShopLayout } from '@/components/layouts';
import { Typography } from '@mui/material';
import { NextPage } from 'next';

import { ProductList } from '@/components/products';
import { useProducts } from '@/hooks/useProducts';
import { FullScreenLoading } from '@/components/ui';






const SearchPage: NextPage=()=> {

    const {products,isloading} = useProducts('/search/haha');

  return (
    
    <ShopLayout title={'Clone-Shop - Search'} pageDescription={'Búsqueda de productos'}>

    <Typography variant='h1' component='h1'>Buscar Producto</Typography>
    <Typography variant='h2' sx={{ mb: 1 }}>ABC -- 123</Typography>
      
      
        {
          isloading
          ? <FullScreenLoading/>
          :<ProductList products={products} />
          
        }



    </ShopLayout>

  )
}
export default SearchPage;