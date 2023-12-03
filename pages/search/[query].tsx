


import { ShopLayout } from '@/components/layouts';
import { Box, capitalize, Typography } from '@mui/material';
import { GetServerSideProps, NextPage } from 'next';

import { ProductList } from '@/components/products';

import { getAllProduct, getProductByTerm } from '@/database/dbProduct';
import { IProduct } from '@/Interfaces';


interface Props{
  products: IProduct[];
  foundProducts: boolean;
  query: string;
}



const SearchPage: NextPage<Props> = ({products,query,foundProducts})=> {

    

  return (
    
    <ShopLayout title={'Clone-Shop - Search'} pageDescription={'Búsqueda de productos'}>

    <Typography variant='h1' component='h1'>Buscar Productos</Typography>
    
      
      {
        foundProducts
        ?<Typography variant='h2' sx={{mb: 1}} textTransform='capitalize'>Término: {query}</Typography>
          :(
          <Box> 
            <Typography variant='h2' sx={{mb: 1}}>No encontramos ningún producto</Typography>
            <Typography variant='h2' sx={{mb: 1}} color='secondary' textTransform='capitalize'> {query}</Typography>
          </Box>
        )
      }
        
        
 
      <ProductList products={products} />

    </ShopLayout>

  )
}


    export const getServerSideProps: GetServerSideProps = async ({params}) => {

        const {query=''} = params as {query: string};

        
        
        if(query.length===0){
            return{
                redirect:{
                    destination: '/',
                    permanent: true
                }
            }
        }

        let products = await getProductByTerm(query);
        const foundProducts = products.length > 0;

        if(!foundProducts){
          // products = await getAllProduct();
          products = await getProductByTerm('solar');
          
        }

              return {
            props: {
                products,
                foundProducts,
                query
            }

        }

      }

export default SearchPage;