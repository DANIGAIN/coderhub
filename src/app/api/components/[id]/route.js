import { NextResponse } from 'next/server'
import { connect } from '@/db/dbConfig'
import CustomError from '@/utils/Error'
import Role from '@/modals/roleModel';
import Component from '@/modals/componentModel';

await connect();

export async function PUT(req, context) {
    const { id } = context.params;

    const data = await req.json();
    try {
        const component = await Component.find({ _id: id })
        if (!component) {
            return NextResponse.json(CustomError.notFoundError({ message: "This component not found" }), { status: 404 })
        }
        await Component.findByIdAndUpdate({ _id: id }, { $set: data }, { new: true })

        return NextResponse.json({
            success: true,
            message: "The component is updated successfully",
        }, { status: 200 });

    } catch (error) {
        return NextResponse.json(CustomError.internalServerError(error), { status: 500 });
    }
}
