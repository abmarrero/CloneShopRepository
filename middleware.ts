import { jwtex } from "@/utils";
import { NextApiRequest } from "next";


import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { validarTokenJWT, validarTokenJWTmidd } from './utils/jwt';

 

export async function middleware(request:NextRequest) {

  // if (request.nextUrl.pathname.endsWith('/checkout/address')) {
  //   const token = request.cookies.get('token');
  //   console.log('thisis '+token?.value);
  // try {
  //   // Obtén el token de las cookies

  //     // Valida el token si la solicitud pertenece a la página de direcciones
  //    const asd = await jwtex.validarTokenJWTmidd(token?.value!);
  //    console.log(' Esto es asd '+asd);
  //     return NextResponse.next();
    
  // } catch (error) {
  //   // Maneja el error redirigiendo al usuario a la página de inicio de sesión con el parámetro 'p' que apunta a la página actual
  //   return NextResponse.redirect(`http://localhost:3000/auth/login?p=${request.url}`);
  // }
// }
}

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

export default middleware;


// Posible Solucion integrando con lo de arriba que funciona a medias
//investigar luego por ahora usare Server Side comente lo arriba para que no funcione x ahora


// El error "The edge runtime does not support Node.js 'crypto' module" 
// indica que estás utilizando un módulo de Node.js que no es compatible 
// con el entorno de ejecución de Edge en Next.js.

// El problema específico viene de la función jwt.verify() que estás 
// utilizando en tu código. Esta función utiliza el módulo 'crypto' de 
// Node.js, el cual no está soportado en el entorno de ejecución de Edge en
//  Next.js.

// Para resolver este problema, puedes utilizar una librería alternativa a 
// jsonwebtoken que no dependa del módulo 'crypto' de Node.js. Una opción 
// popular es jsonwebtoken-browser, que es una versión modificada de jsonwebtoken 
// que está diseñada para funcionar en navegadores y entornos como Next.js.

// Aquí tienes un ejemplo de cómo puedes utilizar jsonwebtoken-browser para verificar
//  un token JWT en Next.js:

// import jwt from 'jsonwebtoken-browser';

// const verifyToken = (token) => {
//   return new Promise((resolve, reject) => {
//     try {
//       const decodedToken = jwt.decode(token);
//       const { id } = decodedToken;
//       resolve(id);
//     } catch (error) {
//       console.log('Error en la verificación del token: ' + error);
//       reject('JWT no es válido');
//     }
//   });
// };

// Ten en cuenta que jsonwebtoken-browser no admite todas las funcionalidades de 
// jsonwebtoken, por lo que es posible que debas ajustar tu código dependiendo de 
// tus necesidades específicas.











