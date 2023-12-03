

import { ISizes } from '@/Interfaces'
import { Box, Button } from '@mui/material';
import React from 'react'
import { FC } from 'react';

interface Props{
    selectedsize?: ISizes;
    sizes: ISizes[];
    onSelectSizes:(sizes:ISizes) => void;
}

export const SizeSelector:FC<Props> = ({selectedsize, sizes, onSelectSizes}) => {
  return (
    <Box>
        {
            sizes.map(size =>(
                <Button 
                key={size} 
                color={selectedsize===size?'primary':'info'} 
                size='small'
                onClick={() => onSelectSizes(size)}
                >
                {size}
                </Button>
            )
            )
        }
    </Box>
  )
}
