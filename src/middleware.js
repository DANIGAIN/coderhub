import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { varifyToken } from "./helpers/varifyToken";
import { matcherPath } from "./utils/Constants";
const SECRET = process.env.SECRET;
export async function middleware(req) {
    const token = await getToken({ req, secret: SECRET })
    const vToken = varifyToken(token)
    const url = req.nextUrl;
    const pathname = url.pathname;

    if (pathname == '/' || pathname == '/home') {
        return NextResponse.rewrite(new URL('/home', req.url))
    }
    if (
        (token && pathname == '/agency/login') ||
        (token && pathname == '/agency/signup') ||
        (!token && pathname === '/profile')
    ) {
        return NextResponse.redirect(new URL('/home', req.url))
    }
    // permission ---------->>        
    if (pathname.startsWith('/agency/dashboard')) {
        // const url = new URL('/api/mapings',req.url);
        // url.searchParams.set('role', token.role);
        // url.searchParams.set('pathname', pathname);
        // const fullUrl = url.href;
        // const response = await  fetch(fullUrl)
        // const res =  await response.json()
        // if(!res.data){
        //     return NextResponse.rewrite(new URL('/not-found', req.url))
        // }        
        return NextResponse.next()
    }

    return NextResponse.next()
}
export const config = {
    matcher: matcherPath
} 