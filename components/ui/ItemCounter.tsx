

import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material'
import { Box, IconButton, Typography } from '@mui/material'
import React, { FC } from 'react'

interface Props {

  currentValue: number;
  MaxValue: number;

  updateQuantity: (newValue: number) => void;
}



export const ItemCounter:FC<Props> = ({currentValue,MaxValue,updateQuantity}) => {

  const onRemoveOrAdd =(value:number) => {
    if (value === -1) {
    if(currentValue===1)return;
        return updateQuantity(currentValue - 1)
    
    }if(currentValue >= MaxValue)return;
    return updateQuantity(currentValue + 1)

  }

  return (
    <Box display='flex' alignItems='center'>
        <IconButton onClick={()=>onRemoveOrAdd(-1)}>
            <RemoveCircleOutline />
        </IconButton>
        <Typography sx={{width: 40, textAlign: 'center'}}>{currentValue}</Typography>
        <IconButton onClick={()=>onRemoveOrAdd(+1)}>
            <AddCircleOutline/>
        </IconButton>
    </Box>
    
  )
}
