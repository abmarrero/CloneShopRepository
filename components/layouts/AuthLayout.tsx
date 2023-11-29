

import Head from 'next/head';
import React, { FC } from 'react'
import { ReactNode } from 'react';
import { Box } from '@mui/material';

interface Props{
    title: string;
    children: ReactNode;
}

export const AuthLayout:FC<Props> = ({title, children}) => {
  return (
    <>
    <Head>
        <title>{ title }</title>
    </Head>
    <main>
        <Box display='flex' justifyContent='center' 
            alignItems='center' height={'calc(100vh - 100px)'} >

            {children}
        </Box>
    </main>
    </>
  )
}
