import { NextResponse } from 'next/server'
import { connect } from '@/db/dbConfig'
import CustomError from '@/utils/Error'
import { sendEmail } from '@/helpers/sendEmail'
import { VerifyTamp } from '@/utils/VerifyTamp'
import bcryptjs from 'bcryptjs'
import User from '@/modals/userModel'
const SECRET = process.env.SECRET || null;

await connect()

export async function GET(req) {
    try {
        const url = new URL(req.url)
        const id = url.searchParams.get('id') || null
        const user = await User.findOne({_id:id})
    
        const varifyTokenString = url.searchParams.get('token') || null

        const name  = user?.name ||null ;
        const email = user?.email || null ;
        
        if(varifyTokenString) {
            const DbUser = await User.findOne({  verifyToken: varifyTokenString })
            if ( DbUser  && DbUser.verifyToken == varifyTokenString) {
                await User.findByIdAndUpdate(DbUser._id, {
                    isVerified: true
                })
                return NextResponse.redirect(new URL('/home' , req.url))
            }
            return NextResponse.json({
                success: false,
                message: "unvarifyed "
            }, { status: 200 })
        }else{
            const hashToken =  await bcryptjs.hash((user._id).toString(), 10);
            const sendUrl = `${process.env.NEXTAUTH_URL}/api/auth/verify-email?token=${hashToken}`
            await User.findByIdAndUpdate(user._id, {
                verifyToken: hashToken,
                verifyTokenExpiry: Date.now()
            })
            sendEmail(email, "verify", "varify your Agency", VerifyTamp(name, sendUrl))
            return NextResponse.json({
                message:"Email is send for varify email",
                success:true,
            });
        }

    } catch (err) {
        return NextResponse.json(CustomError.internalServerError(err), { status: 500 })

    }
}