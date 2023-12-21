import { AppBar, Box, Toolbar,Button ,Typography ,Badge , IconButton, Input, InputAdornment } from '@mui/material'


import Link from '@mui/material/Link';
import { ClearOutlined, SearchOutlined } from '@mui/icons-material';
import {ShoppingCartOutlined} from '@mui/icons-material';
import router, { useRouter } from 'next/router';
import { CartContext, UIContext } from '@/context';
import { useContext, useState } from 'react';
 
export const Navbar = () => {
    const {asPath, push } = useRouter();
    const {toggleSideMenu} = useContext(UIContext);
    const {numberOfItems} = useContext(CartContext)
    
    

    const [SearchTerm, setSearchTerm] = useState('');
    const [isSearchVisible, setSearchVisible] = useState(false);

    const onSearchTerm = () =>{
       if( SearchTerm.trim().length === 0 ) return;
       
       push(`/search/${SearchTerm}`);
    }

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
            

            <Box sx={{display: isSearchVisible ?'none': {xs:'none',sm:'block'}}}>
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
            {

              isSearchVisible
           ? (<Input
            sx={{display:  {xs:'none',sm:'flex'}}}
           className='fadeIn'
            autoFocus
            value={SearchTerm}
            onChange={(e)=> setSearchTerm(e.target.value)}
            onKeyUp={(e) => e.key === 'Enter'? onSearchTerm(): null}
            
            type='text'
            placeholder="Buscar..."
            endAdornment={
              <InputAdornment position="end">
                            <IconButton
                           onClick={() => setSearchVisible(false)}
                        >
                             <ClearOutlined/>
                            </IconButton>
                        </InputAdornment>
                    }
                    />
            )
            :<IconButton
            className='fadeIn'
            onClick={() => setSearchVisible(true)}
            sx={{display:  {xs:'none',sm:'flex'}}}
            >
              <SearchOutlined/>
            </IconButton>
            }

          <IconButton
            className='fadeIn'
            onClick={toggleSideMenu}
            sx={{display:  {xs:'flex',sm:'none'}}}
            >
              <SearchOutlined/>
            </IconButton>

            <Link href='/cart'>
              <IconButton>
               
                  <Badge badgeContent={numberOfItems>9 ? '+9' : numberOfItems } color='secondary'>
                    <ShoppingCartOutlined/>
                  </Badge> 

              </IconButton>
            </Link>

            <Button onClick={toggleSideMenu}>
              Menú
            </Button>

        </Toolbar>
    </AppBar>
  )
}
