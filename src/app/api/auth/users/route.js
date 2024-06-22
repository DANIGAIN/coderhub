import { NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import User from '@/modals/userModel'
import { connect } from '@/db/dbConfig'
import Role from '@/modals/roleModel'
import CustomError from '@/utils/Error'

 await connect()

export async function GET(req, res) {
    try {
        const data = await User.find()
        .select('-createdAt -updateAt -__v -password');
            return NextResponse.json({
                success: true,
                data,
                message:"All user get successfully"
            }, { status:200 })

    } catch (error) {
        return NextResponse.json( CustomError.internalServerError(error), { status: 500 })

    }
}