import { NextResponse } from 'next/server'
import { connect } from '@/db/dbConfig'
import CustomError from '@/utils/Error'
import { sendEmail } from '@/helpers/sendEmail'
import { VerifyTamp } from '@/utils/VerifyTamp'
import bcryptjs from 'bcryptjs'
import User from '@/modals/userModel';

await connect()

export async function POST(req) {
    try {
        const { id } = await req.json();
        const user = await User.findOne({ _id: id })
        const name = user?.name || null;
        const email = user?.email || null;
        const hashToken = await bcryptjs.hash((user._id).toString(), 10);
        const expiry = Date.now() + (7 * 24 * 60 * 60 * 1000)
        const sendUrl = `${process.env.NEXTAUTH_URL}/api/auth/verify-email?token=${hashToken}&expiry=${expiry}&email=${email}`
        await User.findByIdAndUpdate(user._id, {
            verifyToken: hashToken,
            verifyTokenExpiry: expiry
        })
        sendEmail(email, "verify", "varify your Agency", VerifyTamp(name, sendUrl))
        return NextResponse.json({
            message: "Email is send for varify email",
            success: true,
        });

    } catch (error) {
        return NextResponse.json(CustomError.internalServerError(err), { status: 500 })
    }


}

export async function GET(req) {
    try {
        const url = new URL(req.url);
        const varifyTokenString = url.searchParams.get('token') || null;
        const expiry = url.searchParams.get('expiry') || null;
        const email = url.searchParams.get('email') || null;
        const user = await User.findOne({ email })

        if (varifyTokenString && expiry && email) {
            if (user && user.verifyToken == varifyTokenString && user.verifyTokenExpiry >= new Date(Date.now())) {
                await User.findByIdAndUpdate(user._id, {
                    isVerified: true,
                    verifyToken: null,
                    verifyTokenExpiry: Date.now(),
                })
                return NextResponse.redirect(new URL('/agency/login', req.url))
            }
            return NextResponse.redirect(new URL('/error', req.url))
        } else {
            return NextResponse.redirect(new URL('/error', req.url))
        }

    } catch (err) {
        return NextResponse.redirect(new URL(`/error?status=${500}`, req.url))

    }
}