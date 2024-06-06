import { NextResponse } from 'next/server'
import { connect } from '@/db/dbConfig'
import CustomError from '@/utils/Error'
import Service from '@/modals/serviceModel';

await connect();
export async function POST(req) {
    try {
        const body = await req.json()
        body.price = parseInt(body.price);
        body.category = body.categoryId;
        if (!body.price || !body.category) {
            return NextResponse.json(CustomError.notFoundError({ message: "requested resource are not found" }), { status: 404 })
        }
        if (!body.uid) {
            return NextResponse.json(CustomError.unauthorizeError({ message: "Auauthorice ! login first user can not exist" }), { status: 401 })
        }
        const service = await Service.create(body)
        body._id = service;
        return NextResponse.json({
            success: true,
            data: body,
            message: "create a new service",
        }, { status: 201 });

    } catch (error) {
        return NextResponse.json(CustomError.internalServerError(error), { status: 500 });
    }
}
export async function GET(req) {
    try {
        const data = await Service.find()
            .populate([
                { path: 'category', select: '-createdAt -updatedAt -__v' },
                { path: 'uid', select: 'name' }
            ])
            .select('-createdAt -updatedAt -__v')
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