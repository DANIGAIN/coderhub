import { NextResponse } from 'next/server'
import { connect } from '@/db/dbConfig'
import CustomError from '@/utils/Error'
import Component from '@/modals/componentModel';
import { UpdateComponentSchema } from '@/schemas/componentSchema';
import RC_Maping from '@/modals/mapingModal';

await connect();

export async function PUT(req, context) {
    const { id } = context.params;
    const body = await req.json();
    try {
        const response = UpdateComponentSchema.safeParse(body);
        if(!response.success){
            const {errors} = response.error;
            return NextResponse.json(CustomError.validationError(errors),{status:422})
        }
        const component = await Component.findOne({ _id: id })
        if (!component) {
            return NextResponse.json(CustomError.badRequestError({ message: "This component not found" }), { status: 400 })
        }
        const com = await Component.findOne({name: body.name})
        if(com){
            if (com.name === body.name  && com.isActive === body.isActive) {
                return NextResponse.json(CustomError.badRequestError({ message: "This component is alrady exist" }), { status: 400 })
            }
        }
        const data = await Component.findByIdAndUpdate({ _id: id }, { $set: {...body, updatedAt:new Date()} }, { new: true })
        return NextResponse.json({
            success: true,
            data,
            message: "The component is updated successfully",
        }, { status: 200 });

    } catch (error) {
        return NextResponse.json(CustomError.internalServerError(error), { status: 500 });
    }
}
export async function DELETE(req, context) {
    const { id } = context.params;
    try {
        const component = await Component.findOne({ _id: id })
        if (!component) {
            return NextResponse.json(CustomError.badRequestError({ message: "Requested Component was not found " }), { status: 400 })
        }
        const rc = await RC_Maping.findOne({ component : id });
        if (rc) {
            return NextResponse.json(CustomError.badRequestError({message: "Deleted the component can be exist on Maping table."}), { status: 400 });
        }
        await Component.deleteOne({ _id: id })
        return NextResponse.json({
            success: true,
            message: "Delete the component successfully",
        }, { status: 200 });

    } catch (error) {
        return NextResponse.json(CustomError.internalServerError(error), { status: 500 });
    }
}
