
import { connect, disconnect } from '@/database'
import { User } from '@/models'

import type { NextApiRequest, NextApiResponse } from 'next'
import { ObjectId } from 'mongodb';
import {  jwtex } from '@/utils';
// import { isValidToken } from '@/utils/jwt';

import mongoose from 'mongoose';
// import  {ObjectId}  from 'bson-objectid';
// import mongoose, {ObjectId} from 'mongoose';

type Data = 
  |{message: string}
  |{token: string
  user: {name: string;
        role: string;
        email: string; 
     }}
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

    switch( req.method){
        case 'GET':
            return validateUser(req,res)
        default:
            return res.status(400).json ({ message: 'Bad Request' })   
    }

  
}
const validateUser= async(req: NextApiRequest, res: NextApiResponse<Data>) =>{

    const {token=''}= req.headers;

   

  let userId = '';
 
  try {
    
    userId = await jwtex.validarTokenJWT(token.toString() ) ;
  } catch (error) {
    
  }
  function quitarComillas(valor: string): string {
    // Utilizamos una expresión regular para encontrar las comillas dobles y eliminarlas
    return valor.replace(/"/g, "");
  }

  const idd = quitarComillas(userId);
  await connect();
  console.log(userId,'esvalido');
  const user = await User.findById(idd).lean();
  await disconnect();

    console.log(`El usuario es ${user}`);

        if(!user) return res.status(400).json({ message: 'Usuario no es válido' });

        
    const { name,role,_id, email} = user;

    const id =JSON.stringify(_id)

    
    return res.status(200).json({
        token: jwtex.signToken(id,email)
        ,
        user:{
            name,
            role,
            email
        }
    });
}



