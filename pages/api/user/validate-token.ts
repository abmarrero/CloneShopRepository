
import { connect, disconnect } from '@/database'
import { User } from '@/models'

import type { NextApiRequest, NextApiResponse } from 'next'
import { ObjectId } from 'mongoose';
import {  jwtex } from '@/utils';
import { isValidToken } from '@/utils/jwt';
import { IUser } from '../../../Interfaces/user';


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

    const {token=''}= req.cookies;

      // res.status(200).json({
    //     token
        
    // } as any)

    let userid = ''

    try {
        isValidToken(token)
  .then(_id => {
    console.log(`El token es válido. _id = ${_id}`);
    
  })
  .catch(error => {
    console.error(`El token no es válido. Error: ${error}`);
  });
    } catch (error) {
        return res.status(401).json({ message: 'token de autorización no es válido' })
    }


    await connect();
    const user = await User.findById({userid}).lean();
    await disconnect();


        if(!user) return res.status(400).json({ message: 'Usuario no es válido ' })

        
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

