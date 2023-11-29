import React, { FC } from 'react'
import { Slide } from 'react-slideshow-image';
import styles from './ProductSlideShow.module.css';
import 'react-slideshow-image/dist/styles.css'

interface Props{
    image: string[];
}

export const ProductSlideshow:FC<Props> = ({image}) => {
  return (
    <Slide
    easing='ease'
    duration={7000}
    indicators
    >
        {
            image.map(image=>{
                const url = `/products/${image}`;
                return(
                    <div className={styles['each-slide']} key={image} >
                        <div style={{
                            backgroundImage: `url(${url})`,
                            backgroundSize: 'cover'
                        }}>

                        </div>
                    </div>
                )
            })
        }
    </Slide>
  )
}
