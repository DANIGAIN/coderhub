import { NextResponse } from 'next/server'
import { connect } from '@/db/dbConfig'
import CustomError from '@/utils/Error'
import Service from '@/modals/serviceModel';
import { UpdateServiceSchema } from '@/schemas/serviceSchema';

await connect();
export async function GET(req, context) {
    const { id } = context.params;
    try {
        const data = await Service.findOne({ _id: id })
            .populate([
                { path: 'category', select: '-createdAt -updatedAt -__v' },
                { path: 'uid', select: 'name' },
                { path: 'reviews', select: '_id rating' }
            ])
            .select('-__v')
            .exec();
        return NextResponse.json({
            success: true,
            data,
            message: "Get all the services",
        }, { status: 200 });

    } catch (error) {
        return NextResponse.json(CustomError.internalServerError(error), { status: 500 });
    }
}
export async function DELETE(req, context) {
    const { id } = context.params;
    try {
        const service = await Service.findOne({ _id: id })
        if (!service) {
            return NextResponse.json(CustomError.badRequestError({ message: "Requested service was not found " }), { status: 400 })
        }
        await Service.deleteOne({ _id: id })
        return NextResponse.json({
            success: true,
            message: "Deleted the service successfully",
        }, { status: 200 });

    } catch (error) {
        console.log(error)
        return NextResponse.json(CustomError.internalServerError(error), { status: 500 });
    }
}
export async function PUT(req, context) {
    try {
        const { id } = context.params;
        const body = await req.json()
        const response = UpdateServiceSchema.safeParse(body);
        if (!response.success) {
            const { errors } = response.error;
            return NextResponse.json(CustomError.validationError(errors), { status: 422 })
        }
        const data = await Service.findByIdAndUpdate({ _id: id }, { $set: { ...body, updatedAt: new Date()}},{ new: true })
            .populate([
                { path: 'category', select: '-createdAt -updatedAt -__v' },
                { path: 'uid', select: 'name' },
                { path: 'reviews', select: '_id rating' }
            ]);
        return NextResponse.json({
            data,
            message: "service is updated successfully",
            success: true
        })
    } catch (error) {
        console.log(error)
        return NextResponse.json(CustomError.internalServerError(error), { status: 500 })
    }
}