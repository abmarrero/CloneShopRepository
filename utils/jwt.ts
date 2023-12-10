
import jwt from 'jsonwebtoken';

export const signToken = (id: string, email: string) =>{

    if(!process.env.JWT_SECRET_SEED)
    throw new Error('no hay semilla de JWT - Revisa las variables de entorno');

    return jwt.sign(
        //paylooad
        {id, email},
        //Seed
        process.env.JWT_SECRET_SEED,
        //Options
        {expiresIn: '30d'}
    )

}