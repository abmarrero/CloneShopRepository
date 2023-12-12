
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

export const isValidToken = (token:string): Promise<string> =>{

    
    return new Promise((resolve,reject) => {
        if(!process.env.JWT_SECRET_SEED) {
            throw new Error('no hay semilla de JWT - Revisa las variables de entorno');
        }

        try {
            jwt.verify(token, process.env.JWT_SECRET_SEED || '', (err, payload) => {
                if (err) {return reject('JWT no es válido');}
                const {_id} = payload as {_id: string};
                JSON.stringify(resolve(_id));
            });
        } catch (error) {
            reject('JWT no es válido')  ;
        }

      })
}
