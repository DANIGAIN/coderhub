import { NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import User from '@/modals/userModel'
import { connect } from '@/db/dbConfig'
import Role from '@/modals/roleModel'
import CustomError from '@/utils/Error'
import SignupSchema from '@/schemas/signupSchema'

await connect()

export async function POST(req) {
    try {
        const body = await req.json()
        const { password, name, email } = body
        const response = SignupSchema.safeParse(body);
        if (!response.success) {
            const { errors } = response.error;
            return NextResponse.json(CustomError.validationError(errors), { status: 422 })
        }
        //check user exist or not ---> 
        const user = await User.findOne({ email })
        if (user) {
            return NextResponse.json({
                success: false,
                id: user._id,
                message: "User Alrady exist"
            }, { status: 422 })
        }
        const solt = await bcryptjs.genSalt(10)
        const hashPassword = await bcryptjs.hash(password, solt)
        const role = await Role.findOne({ name: "User", isActive: true })
        const data = await User.create({ name, email, password: hashPassword, role })
        return NextResponse.json({
            success: true,
            data: { _id: data._id },
            message: "User is created successfuly"
        }, { status: 201 })

    } catch (error) {
        return NextResponse.json(CustomError.internalServerError(error), { status: 500 })
    }
}