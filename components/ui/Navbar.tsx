import { AppBar, Box, Toolbar,Button ,Typography ,Badge , IconButton } from '@mui/material'


import Link from '@mui/material/Link';
import { SearchOutlined } from '@mui/icons-material';
import {ShoppingCartOutlined} from '@mui/icons-material';
import { useRouter } from 'next/router';
 
export const Navbar = () => {
    const {asPath } = useRouter();
    console.log(asPath) 


  return (
    <AppBar >
        <Toolbar >

          

            {/* <NextLink href='./' passHref> */}
            
            
                <Link href='/' display='flex' alignItems='center' >

                    <Typography variant='h6' >Clone |</Typography>
                    <Typography sx={{ml: 0.5}}>Shop</Typography>    
                    

                </Link> 
            
            {/* </NextLink> */}
            
            <Box flex={1}/>
            

            <Box sx={{display: {xs:'none',sm:'block'}}}>
              <Link href='/category/men'>
                <Button color={ asPath==='/category/men' ? 'primary': 'info'}>Hombres </Button>
              </Link>
            
              <Link href='/category/women'>
                <Button color={ asPath === '/category/women' ? 'primary': 'info'}>mujeres</Button>
              </Link>
            
              <Link href='/category/kid'>
                <Button color={asPath==='/category/kid' ? 'primary': 'info'}>Niños</Button>
              </Link>
            </Box>
           
            <Box flex={1}/>

            <IconButton>
              <SearchOutlined/>
            </IconButton>

            <Link href='/cart'>
              <IconButton>
               
                  <Badge badgeContent={2} color='secondary'>
                    <ShoppingCartOutlined/>
                  </Badge> 

              </IconButton>
            </Link>

            <Button>
              Menú
            </Button>

        </Toolbar>
    </AppBar>
  )
}
