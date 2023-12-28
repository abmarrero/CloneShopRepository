import { jwtex } from "@/utils";
import { NextApiRequest } from "next";


import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { validarTokenJWT, validarTokenJWTmidd } from './utils/jwt';

 

export async function middleware(request:NextRequest) {

  if (request.nextUrl.pathname.endsWith('/checkout/address')) {
    const token = request.cookies.get('token');
    console.log('thisis '+token?.value);
  try {
    // Obtén el token de las cookies

      // Valida el token si la solicitud pertenece a la página de direcciones
     const asd = await jwtex.validarTokenJWTmidd(token?.value!);
     console.log(' Esto es asd '+asd);
      return NextResponse.next();
    
  } catch (error) {
    // Maneja el error redirigiendo al usuario a la página de inicio de sesión con el parámetro 'p' que apunta a la página actual
    return NextResponse.redirect(`http://localhost:3000/auth/login?p=${request.url}`);
  }
}
}

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

export default middleware;
















// export async function middleware(request: NextRequest) {

//   // request.cookies.has('token') 
//   const token = request.cookies.get('token');
//  try {
//   if (request.nextUrl.pathname.endsWith('/address')) {
//   await jwtex.validarTokenJWT(token as any);
//   return NextResponse.next();
//   }
//  } catch (error) {
//   return NextResponse.redirect(`/auth/login?p=${request.url}`); 
//  }
  
// }

// export const config = {
//   matcher: '/checkout/address/:path*',
// }


// export async function middleware(req: NextRequest, ev: NextFetchEvent) {

//     let cookieFromRequest = req.cookies.get
//     console.log(cookieFromRequest);
//     try {
      
//      await jwtex.validarTokenJWT(cookieFromRequest.toString() ) ;
//      return NextResponse.next();   
//     } catch (error) {
//         const requestPage = req.nextUrl
//       return NextResponse.redirect(`/auth/login?p=${requestPage}`);  
//     }


// }