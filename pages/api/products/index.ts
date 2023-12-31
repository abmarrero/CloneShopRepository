
import { connect, disconnect } from '@/database'
import { Product } from '@/models'
import type { NextApiRequest, NextApiResponse } from 'next'
import { IProduct } from '../../../Interfaces/product';
import { shopConstants } from '../../../database/constants';

type Data = 
  |{message: string}
  |IProduct[]

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

    switch( req.method){
        case 'GET':
            return getProducts(req,res)
        default:
            return res.status(400).json ({ message: 'Bad Request' })   
    }

  
}
const getProducts= async(req: NextApiRequest, res: NextApiResponse<Data>) =>{

    const {gender='all'}= req.query;
    let condition = {};

    if(gender!='all' && shopConstants.validGenders.includes(`${gender}`)){
      condition = {gender}
    }

    await connect();
    const products = await Product.find(condition)
                                  .select('title images price inStock slug -_id')
                                  .lean();
    await disconnect();
    return res.status(200).json(products);
}

