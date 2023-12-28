
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

// export const isValidToken = (token:string): Promise<string> =>{

    
//     return new Promise((resolve,reject) => {
        // if(!process.env.JWT_SECRET_SEED) {
        //     throw new Error('no hay semilla de JWT - Revisa las variables de entorno');
        // }

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
  
      if(!process.env.JWT_SECRET_SEED) {
          throw new Error('no hay semilla de JWT - Revisa las variables de entorno');
      }
      if(token.length <= 10) {
         Promise.reject('JWT no es válido');
    }
    return new Promise((resolve, reject) => {
      try {
        jwt.verify(token, process.env.JWT_SECRET_SEED || '', (err, decodedToken) => {
          if (err) {
            console.log('esto es verify '+err);
            reject(err);
          } else {
              const {id} = decodedToken as {id: string};
              
            resolve(id);
          }
        });
        
      } catch (error) {
        console.log('esto es validate '+error);
        reject('JWT no es válido');
      }
    });
  };


  export const validarTokenJWTmidd = (token:string):Promise<string> => {
    // const crypto = window.crypto || window.Crypto;
    
    // const array = new Uint32Array(1);
    // crypto.getRandomValues(array);
    // const randomValue = array[0];
    //     if(!process.env.JWT_SECRET_SEED) {
      //       throw new Error('no hay semilla de JWT - Revisa las variables de entorno');
      //   }
      //   if(token.length <= 10) {
      //      Promise.reject('JWT no es válido');
      // }
      return new Promise((resolve, reject) => {
        try {
          jwt.verify(token, process.env.JWT_SECRET_SEED || '', (err, decodedToken) => {
            if (err) {
              console.log('esto es verify '+err);
              reject(err);
            } else {
                const {id} = decodedToken as {id: string};
                
              resolve(id);
            }
          });
          
        } catch (error) {
          console.log('esto es validate '+error);
          reject('JWT no es válido');
        }
      });
    };