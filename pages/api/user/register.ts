import { connect, disconnect } from '@/database'
import { User } from '@/models'

import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcryptjs';
import { jwtex, validations } from '@/utils';
import { isValidEmail } from '@/utils/validations';


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
            return registerUser(req,res)
        default:
            return res.status(400).json ({ message: 'Bad Request' })   
    }

  
}
const registerUser= async(req: NextApiRequest, res: NextApiResponse<Data>) =>{

    const {email='',password='',name=''}= req.body as {email: string,password: string,name: string};


    await connect();
    const user = await User.findOne({email});

    if(password.length<6){
        return res.status(400).json({ message: 'la contraseña tiene que ser mayor de 6 caracteres' })
    }

    if(password.length<2){
        return res.status(400).json({ message: 'la contraseña tiene que ser menor de 2 caracteres' })
    }

    if(!isValidEmail(email)){
        return res.status(400).json({ message: 'el formato de correo no es valido' })

    }
    
    if(user) {
        await disconnect();
        return res.status(400).json({ message: 'el correo ya esta registrado' })
    }

    const newUser = new User ({
        name,
        role:'client',
        password: bcrypt.hashSync(password),
        email: email.toLocaleLowerCase(),
    });

    try {
        await newUser.save({validateBeforeSave: true});
    } catch (error) {
        console.log(error);
        return res.status(500).json ({ message: 'Revisar logs del servidor' })
    }
    const { role='',_id} = newUser;

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

