import { NextResponse } from "next/server";
import User from "@/modals/userModel";
import CustomError from "@/utils/Error";
import bcryptjs from 'bcryptjs'
import { connect } from "@/db/dbConfig";

await connect();

export async function POST(req) {

  try {
    const { email, token, password } = await req.json();
    
    const user = await User.findOne({ email });
    if (!user) {
        return NextResponse.json(CustomError.badRequestError({
            message:"user can not be found"
        }),{status:400})
    }
    
    if (token!== user.forgetToken) {
        return NextResponse.json(CustomError.badRequestError({
            message:"token can not be match"
        }),{status:400})
    }
    
    if (user.forgetTokenExpiry < new Date()) {
       
        return NextResponse.json(CustomError.badRequestError({
            message:"sorry !Time is over"
        }),{status:400})
      } 
    
    const solt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, solt);

    await User.findByIdAndUpdate(user._id, {
      forgetToken: null,
      forgetTokenExpiry: Date.now(),
      password: hashPassword
    });
    return NextResponse.json({
      message: "Passoword update succesfuly",
      success: true,
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json(CustomError.internalServerError(err), { status: 500 });
  }
}