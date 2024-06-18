import { NextResponse } from 'next/server'
import { connect } from '@/db/dbConfig'
import CustomError from '@/utils/Error'
import Role from '@/modals/roleModel';

await connect();
export async function POST(req) {
    try {
        const body = await req.json()
        const role = await Role.create(body)
        body._id = role;
        return NextResponse.json({
            success: true,
            data: body,
            message: "create a new role",
        }, { status: 201 });

    } catch (error) {
        return NextResponse.json(CustomError.internalServerError(error), { status: 500 });
    }
}
export async function GET(req) {
    try {
        const data = await Role.find()
            .sort({'createdAt':-1})
            .select('-createdAt -updatedAt -__v')
            .exec();
        return NextResponse.json({
            success: true,
            data,
            message: "Get all the Role",
        }, { status: 200 });

    } catch (error) {
        return NextResponse.json(CustomError.internalServerError(error), { status: 500 });
    }
}