

import { IProduct } from '@/Interfaces/product'
import { Box, Card, CardActionArea, CardMedia, Grid, Link, Typography } from '@mui/material';
import React, { useMemo, useState, useEffect } from 'react'
 
import { FC } from 'react';



 interface Props{
 product: IProduct
}

export const ProductCard:FC<Props> = ({product}) => {

    const [isHovered, setIsHovered] = useState(false);
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const [showEffect, setShowEffect] = useState(true);

    const handleMouseEnter = () => {
      setIsHovered(true);
      setShowEffect(true);
    }
    
    const handleMouseLeave = () => {
      setIsHovered(false);
      setShowEffect(false);
    }

    useEffect(() => {
      const timer = setTimeout(() => {
        setShowEffect(false);
      }, 50);
    
      return () => clearTimeout(timer);
    }, []);

   const productImage = useMemo(() => {
       return isHovered
        ? `/products/${product.images[1]}` 
        : `/products/${product.images[0]}`

    }, [isHovered,product.images])



  return (
    <Grid item 
    xs={6} 
    sm={4}
    onMouseEnter={handleMouseEnter }
    onMouseLeave={handleMouseLeave}
    >
    <Card>
        

        <Link href={`/product/${product.slug}`}>
      <CardActionArea>
        <CardMedia 
        component='img'
        className = {showEffect ? 'fadeIn': ''}
        image={productImage}
        alt={product.title}
        onLoad={()=> setIsImageLoaded(true)}
        />
      </CardActionArea>
     </Link>
    
</Card>
  <Box sx={{mt: 1, display:isImageLoaded ? 'block' : 'none'}} 
      className = {showEffect ? 'fadeIn': ''} 
         >
        <Typography fontWeight={700}>{product.title}</Typography>
        <Typography fontWeight={500}>{`$${product.price}`}</Typography>
  </Box>

</Grid>

  )
}




