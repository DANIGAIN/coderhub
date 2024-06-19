import { NextResponse } from 'next/server'
import { connect } from '@/db/dbConfig'
import CustomError from '@/utils/Error'
import Component from '@/modals/componentModel';

await connect();
export async function POST(req) {
    try {
        const body = await req.json()
        const component = await Component.create(body)
        body._id = component._id;
        return NextResponse.json({
            success: true,
            data: body,
            message: "create a component successfully",
        }, { status: 201 });

    } catch (error) {
        return NextResponse.json(CustomError.internalServerError(error), { status: 500 });
    }
}
export async function GET(req) {
    try {
        const data = await Component.find()
            .sort({'createdAt':-1})
            .select('-createdAt -updatedAt -__v')
            .exec();
        return NextResponse.json({
            success: true,
            data,
            message: "Get all the Component successfully",
        }, { status: 200 });

    } catch (error) {
        return NextResponse.json(CustomError.internalServerError(error), { status: 500 });
    }
}