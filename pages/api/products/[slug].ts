

import { connect, disconnect } from '@/database'
import { Product } from '@/models'
import type { NextApiRequest, NextApiResponse } from 'next'
import { IProduct } from '../../../Interfaces/product';


type Data = 
  |{message: string}
  |IProduct

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

    switch( req.method){
        case 'GET':
            return getProductBySlug(req,res)
        default:
            return res.status(400).json ({ message: 'Bad Request' })   
    }

  
}
const getProductBySlug= async(req: NextApiRequest, res: NextApiResponse<Data>) =>{

    
  
    
    await connect();
    const {slug}= req.query;
    const product = await Product.findOne({slug})
                                  .lean();
    await disconnect();

    if(!product){
        return res.status(400).json ({ message: 'Producto no encontrado' }) 
    }

    return res.json(product);
}