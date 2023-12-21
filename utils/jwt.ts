
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongoose';


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

// export const isValidToken = (token:string): Promise<string> =>{

    
//     return new Promise((resolve,reject) => {
//         if(!process.env.JWT_SECRET_SEED) {
//             throw new Error('no hay semilla de JWT - Revisa las variables de entorno');
//         }

//         try {
//             jwt.verify(token, process.env.JWT_SECRET_SEED , (err, payload) => {
//                 if (err) {return reject('JWT no es válido');}
//                 const {_id} = payload as {_id: string};
//                return resolve(_id);
//             });
//         } catch (error) {
//             reject('JWT no es válido 2do')  ;
//         }

//       })
// }

export const validarTokenJWT = (token:string):Promise<string> => {
    return new Promise((resolve, reject) => {
      jwt.verify(token, process.env.JWT_SECRET_SEED || '', (err, decodedToken) => {
        if (err) {
          reject(err);
        } else {
            const {id} = decodedToken as {id: string};
            
          resolve(id);
        }
      });
    });
  };