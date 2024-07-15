import { NextResponse } from 'next/server'
import { connect } from '@/db/dbConfig'
import CustomError from '@/utils/Error'
import Component from '@/modals/componentModel';
import { CreateComponentSchema } from '@/schemas/componentSchema';

await connect();
export async function POST(req) {
    try {
        const body = await req.json()
        const response = CreateComponentSchema.safeParse(body);
        if(!response.success){
            const {errors} = response.error;
            return NextResponse.json(CustomError.validationError(errors),{status:422})
        }
        const component = await Component.findOne({name:body.name});
        if(component){
            return NextResponse.json(CustomError.badRequestError({message:"Role is alrady exist"}),{status:400})
        }
        const data = await Component.create(body);
        return NextResponse.json({
            success: true,
            data,
            message: "create a component successfully",
        }, { status: 201 });

    } catch (error) {
        return NextResponse.json(CustomError.internalServerError(error), { status: 500 });
    }
}
export async function GET(req) {
    try {
        const data = await Component.find({})
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