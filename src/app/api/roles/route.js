import { NextResponse } from 'next/server'
import { connect } from '@/db/dbConfig'
import CustomError from '@/utils/Error'
import Role from '@/modals/roleModel';
import { CreateRoleSchema } from '@/schemas/roleSchema';

await connect();
export async function POST(req) {
    try {
        const body = await req.json()
        const response = CreateRoleSchema.safeParse(body);
        if(!response.success){
            const {errors} = response.error;
            return NextResponse.json(CustomError.validationError(errors),{status:422})
        }
        const role = await Role.findOne({name:body.name});
        if(role){
            return NextResponse.json(CustomError.badRequestError({message:"Role is alrady exist"}),{status:400})
        }
        const data = await Role.create(body)
        
        return NextResponse.json({
            success: true,
            data,
            message: "Create a new role",
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