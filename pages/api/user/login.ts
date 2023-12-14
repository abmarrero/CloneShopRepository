import { connect, disconnect } from '@/database'
import { User } from '@/models'

import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcryptjs';
import {  jwtex } from '@/utils';


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
        case 'POST':
            return loginUser(req,res)
        default:
            return res.status(400).json ({ message: 'Bad Request' })   
    }

  
}
const loginUser= async(req: NextApiRequest, res: NextApiResponse<Data>) =>{

    const {email='',password=''}= req.body;


    await connect();
    const user = await User.findOne({email});
    await disconnect();

        if(!user) return res.status(400).json ({ message: 'Correo o contraseñas no válidos - EMAIL' })

        if(!bcrypt.compareSync(password, user.password!))
        res.status(400).json ({ message: 'Correo o contraseñas no válidos - Contraseña' })
    
    const { name,role,_id} = user;

    const id =JSON.stringify(_id)

    const token = jwtex.signToken(id,email)

    return res.status(200).json({
        token,
        user:{
            name,
            role,
            email
        }
    });
}

