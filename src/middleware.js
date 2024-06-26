import {  NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { varifyToken } from "./helpers/varifyToken";
import {  matcherPath  } from "./utils/Constants";
const SECRET = process.env.SECRET ;
export  async function middleware(req){
    const token = await getToken({req ,secret: SECRET})
    const vToken = varifyToken(token) 
    const url = req.nextUrl;
    const pathname = url.pathname;

    if(pathname == '/' || pathname == '/home' ){
        return NextResponse.rewrite(new URL('/home' , req.url))
    }
        
    if(
        (token && pathname == '/agency/login') || 
        (token && pathname == '/agency/signup')|| 
        (!token && pathname === '/profile')
    ){
        return NextResponse.redirect(new URL('/home', req.url))
    } 
       
    // if(pathname.startsWith('/api/categories') && ['POST','PUT', 'DELETE'].includes(req.method) && !vToken){
    //     return NextResponse.json(CustomError.unauthorizeError({message:"UnAuthorized ! Please autenticate to access this resounce"}) , {status:401})
    // }
    // if(pathname.startsWith('/api/services') && ['POST','PUT', 'DELETE'].includes(req.method) && !vToken){
    //     return NextResponse.json(CustomError.unauthorizeError({message:"UnAuthorized ! Please autenticate to access this resounce"}) , {status:401})
    // }
}    
export const config = {
    matcher: matcherPath
} 