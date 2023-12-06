
import { ICart, IProduct, ISizes } from '@/Interfaces';
import { ShopLayout } from '@/components/layouts'
import { ProductSlideshow, SizeSelector } from '@/components/products';
import { ItemCounter } from '@/components/ui';
import { dbProduct } from '@/database';


import { Box, Button, Chip, Grid, Typography } from '@mui/material'
import { NextPage, GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next';
import router from 'next/router';

import React, { useContext, useState } from 'react'
import { CartContext } from '../../context/cart/CartContext';

interface Props{
    product: IProduct
}

export const Slug:NextPage<Props> = ({product}) => {

   const [tempCartProduct, settempCartProduct] = useState<ICart>({

    _id: product._id,
    images: product.images[0],
    price: product.price,
    sizes: undefined,
    slug: product.slug,
    title: product.title,
    gender: product.gender,
    quantity: 1,

   })

   const {addProductToCart} = useContext(CartContext)
   

   const onUpdateQuantity = (quantity:number) => {
    settempCartProduct(currentProduct=>({
        ...currentProduct,

        quantity
   }));
   }
   
   const onSelectSizes = (sizes:ISizes) => {
    settempCartProduct(currentProduct=>({
        ...currentProduct,

        sizes
   }));
   }

    const onAddProduct = () => {

        if(!tempCartProduct)return;
        addProductToCart(tempCartProduct)   
        router.push('/cart')
    } 


  return (
    
    <ShopLayout title={product.title} pageDescription={product.description} >
        <Grid container spacing={3}>
            <Grid item xs={12} sm={7}>
                <ProductSlideshow image={product.images} />          
                </Grid>
            <Grid item xs={12} sm={5} display='flex' flexDirection='column'>
                <Box>
                    <Typography variant='h1' component='h1'> 
                        {product.title}
                    </Typography>
                    <Typography variant='subtitle1' component='h2' > 
                        {`$${product.price}`}
                    </Typography>
                </Box>
                <Box sx={{my: 2}}>
                    <Typography variant='subtitle2'> 
                        Cantidad
                    </Typography>
                    <ItemCounter
                    currentValue={tempCartProduct.quantity}
                    MaxValue={product.inStock > 10 ? 10 : product.inStock}
                    updateQuantity={onUpdateQuantity}
                    />
                    <SizeSelector  sizes={product.sizes}
                                   selectedsize={tempCartProduct.sizes}
                                   onSelectSizes={(sizes)=>onSelectSizes(sizes)}
                    />
                </Box>  
                {
                    (product.inStock > 0)
                    ?(<Button color='secondary' className='circular-btn' onClick={onAddProduct}>
                        {
                            tempCartProduct.sizes
                            ?'Agregar al carrito'
                            :'Seleccione una talla'
                        }
                    </Button>)
                  : <Chip label='no hay disponible' color='error' variant='outlined'/> 

                }    
                <Box sx={{mt: 3}}>
                    <Typography variant='subtitle2'> 
                        Descripción
                    </Typography>
                    <Typography variant='body2'> 
                        {product.description}
                    </Typography>
                </Box>  

                
            </Grid>
        </Grid>
    </ShopLayout>
  )
}

    // no usar esto...SSR 
    // export const getServerSideProps: GetServerSideProps = async ({params}) => {

    //     const {slug=''} = params as {slug: string};

    //     const product = await getProductBySlug(slug);
        
    //     if(!product){
    //         return{
    //             redirect:{
    //                 destination: '/',
    //                 permanent: false
    //             }
    //         }
    //     }

    //     return {
    //         props: {
    //             product
    //         }

    //     }

    //     }

    export const getStaticPaths: GetStaticPaths = async() => {
    const productSlugs = await dbProduct.getAllProductSlug();
    
        return {
            paths:productSlugs.map(({slug}) =>({
                params:{
                    slug
                }
        })),
            fallback:'blocking'
        }
    }
    
    export const getStaticProps: GetStaticProps = async({params}) => {
    
            const {slug=''} = params as {slug: string};

        const product = await dbProduct.getProductBySlug(slug);
        
        if(!product){
            return{
                redirect:{
                    destination: '/',
                    permanent: false
                }
            }
        }
        return {
            props:{
                product
            },
            revalidate: 60 * 60 * 24
        }
    }



export default Slug
