import '@/styles/globals.css'
import type { AppProps } from 'next/app'

import { CssBaseline,ThemeProvider } from '@mui/material'


import {lightTheme} from '@/themes/light-theme'

import '@/styles/globals.css'
import { SWRConfig } from 'swr/_internal'
import { AuthProvider, CartProvider, UIProvider } from '@/context'


function MyApp({Component, pageProps }: AppProps) {
  
  return (

    <SWRConfig 
      value={{
        // refreshInterval: 3000,
        fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
      }}
    >
      <AuthProvider>  
        <CartProvider>
          <UIProvider>
            <ThemeProvider theme={lightTheme} >
                <CssBaseline/>
              <Component {...pageProps} />
            </ThemeProvider>
          </UIProvider>
        </CartProvider>  
      </AuthProvider>  
    </SWRConfig>      


  )
  }
export default MyApp;