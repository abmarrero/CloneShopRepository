


import { ShopLayout } from '@/components/layouts';
import { Typography } from '@mui/material';
import { GetServerSideProps, NextPage } from 'next';

import { ProductList } from '@/components/products';

import { getProductByTerm } from '@/database/dbProduct';
import { IProduct } from '@/Interfaces';


interface Props{
  products: IProduct[];
}



const SearchPage: NextPage<Props> = ({products})=> {

    

  return (
    
    <ShopLayout title={'Clone-Shop - Search'} pageDescription={'Búsqueda de productos'}>

    <Typography variant='h1' component='h1'>Buscar Producto</Typography>
    <Typography variant='h2' sx={{ mb: 1 }}>ABC -- 123</Typography>
      
      
       
          :<ProductList products={products} />
          
         



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

        const products = await getProductByTerm(query);

              return {
            props: {
                products
            }

        }

      }

export default SearchPage;