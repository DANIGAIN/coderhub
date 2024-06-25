import User from "@/modals/userModel";
import CustomError from "@/utils/Error";
import { NextResponse } from "next/server";
import { sendEmail } from '@/helpers/sendEmail'
import bcryptjs from 'bcryptjs'


export async function POST(req) {
    try {
        const email = await req.json();

        const user = await User.findOne({ email })
        if (!user) {
            return NextResponse.json(CustomError.badRequestError({ message: "user can not found" }), { status: 404 })
        }

        const hashToken = await bcryptjs.hash((user._id).toString(), 10);
        const extime = Date.now() +(2 * 60 *  1000);
        const sendUrl = `${process.env.NEXTAUTH_URL}/api/auth/forget-password?token=${hashToken}&email=${email}&extime=${extime}`
        await User.findByIdAndUpdate(user._id, {
            forgetToken: hashToken,
            forgetTokenExpiry: extime,
        })
        sendEmail(email, "forget-password", "please forget your password", VerifyTamp(user.name, sendUrl))
        return NextResponse.json({
            message: "Please check your email ",
            success: true,
        });
    } catch (err) {
        return NextResponse.json(CustomError.internalServerError(err), { status: 500 })

    }
}
export async function GET(req){
    try{
        const url = new URL(req.url)
        const email = url.searchParams.get('email')|| null;
        const token = url.searchParams.get('token')|| null;
        const extime = url.searchParams.get('extime')|| null;
        return NextResponse.json({
            message: "ok",
            data:{
                email,
                token,
                extime,
            },
            success: true,
        });

    }catch(error){
        return NextResponse.json(CustomError.internalServerError(err), { status: 500 })
    }
  



}