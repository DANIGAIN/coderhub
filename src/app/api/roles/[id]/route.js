import { NextResponse } from 'next/server'
import { connect } from '@/db/dbConfig'
import CustomError from '@/utils/Error'
import Role from '@/modals/roleModel';
import RC_Maping from '@/modals/mapingModal';

await connect();
export async function GET(req, context) {
    const { id } = context.params;
    try {
        const data = await Role.findOne({ _id: id })
            .select('-__v')
            .exec();
        if (!data) {
            return NextResponse.json(CustomError.notFoundError({ message: "This role not found" }), { status: 404 })
        }
        return NextResponse.json({
            success: true,
            data,
            message: "Get  the role successfully",
        }, { status: 200 });

    } catch (error) {
        return NextResponse.json(CustomError.internalServerError(error), { status: 500 });
    }
}
export async function PUT(req, context) {
    const { id } = context.params;
    const data = await req.json();
    try {
        const role = await Role.find({ _id: id })
        if (!role) {
            return NextResponse.json(CustomError.notFoundError({ message: "This role not found" }), { status: 404 })
        }
        await Role.findByIdAndUpdate({ _id: id }, { $set: data }, { new: true })

        return NextResponse.json({
            success: true,
            message: "The role is updated successfully",
        }, { status: 200 });

    } catch (error) {
        return NextResponse.json(CustomError.internalServerError(error), { status: 500 });
    }
}
export async function DELETE(req, context) {

    const { id } = context.params;
    try {
        const role = await Role.find({ _id: id })
        if (!role) {
            return NextResponse.json({ message: "Requested role was not found " }, { status: 404 })
        }
        const rc = await RC_Maping.findOne({ _id: id });
        if (rc) {
            return NextResponse.json({
                success: false,
                message: "Deleted the role can be exist on Maping table.",
            }, { status: 400 });
        }
        await Role.deleteOne({ _id: id })
        return NextResponse.json({
            success: true,
            message: "Delete the role successfully",
        }, { status: 200 });

    } catch (error) {
        return NextResponse.json(CustomError.internalServerError(error), { status: 500 });
    }
}