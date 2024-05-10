import {  NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { varifyToken } from "./utils/varifyToken";
import { adminRoute, matcherPath , privateDomain } from "./utils/constants";
import CustomError from "./utils/Error";
const SECRET = process.env.SECRET ;
export  async function middleware(req){
    const token = await getToken({req ,secret: SECRET})
    const vToken = varifyToken(token) 
    const url = req.nextUrl;
    const pathname = url.pathname;

    if(pathname == '/' || pathname == '/home'){
        return NextResponse.rewrite(new URL('/home' , req.url))
    }
    
    if(
        (token && pathname == '/agency/login') || 
        (token && pathname == '/agency/signup')|| 
        (!vToken && pathname.startsWith('/agency/dashboard')) ||
        (pathname.startsWith('/agency/dashboard') && token.role == 10)
    ){
        return NextResponse.redirect(new URL('/home', req.url))
    } 
       
    if(pathname.startsWith('/api/categories') && ['POST','PUT', 'DELETE'].includes(req.method) && !vToken){
        return NextResponse.json(CustomError.unauthorizeError({message:"UnAuthorized ! Please autenticate to access this resounce"}) , {status:401})
    }
}    
export const config = {
    matcher: matcherPath
} 