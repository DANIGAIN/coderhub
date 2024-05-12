import { NextResponse } from 'next/server'
import { connect } from '@/db/dbConfig'
import CustomError from '@/utils/Error'
import { sendEmail } from '@/helpers/sendEmail'
import { getToken } from 'next-auth/jwt'
import { VerifyTamp } from '@/utils/VerifyTamp'
import bcryptjs from 'bcryptjs'
import User from '@/modals/userModel'
const SECRET = process.env.SECRET || null


await connect()

export async function GET(req) {
    try {
        const url = new URL(req.url)
        const user = await getToken({ req, secret: SECRET })

        if (!user) {
            return NextResponse.json(CustomError.unauthorizeError({ message: "UnAuthorized ! Please autenticate to access this resounce" }), { status: 401 })
        }
        const varifyTokenString = url.searchParams.get('token') || null
        
        const name = user.name || null
        const email = user.email || null
       
        if(varifyTokenString) {
            const DbUser = await User.find({ _id: user.uid })
            if (DbUser[0].verifyToken == varifyTokenString) {
                await User.findByIdAndUpdate(user.uid, {
                    isVerified: true
                })
                return NextResponse.json({
                    success: true,
                    message: "varifyed"
                }, { status: 200 })
            }
            console.log(DbUser[0].verifyToken)
            console.log(varifyTokenString)
            return NextResponse.json({
                success: false,
                message: "unvarifyed "
            }, { status: 200 })
        }else{

            const hashToken =  await bcryptjs.hash(user.uid, 10);
            const sendUrl = `${process.env.NEXTAUTH_URL}/api/auth/verify-email?token=${hashToken}`
            console.log(hashToken)
            await User.findByIdAndUpdate(user.uid, {
                verifyToken: hashToken,
                verifyTokenExpiry: Date.now()
            })
            sendEmail(email, "verify", "varify your Agency", VerifyTamp(name, sendUrl))
            return NextResponse.json({
                success: true,
                message: "Send the message"
            }, { status: 200 })
        }

    } catch (err) {
        return NextResponse.json(CustomError.internalServerError(err), { status: 500 })

    }
}