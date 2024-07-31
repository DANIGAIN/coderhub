import { NextResponse } from 'next/server'
import { connect } from '@/db/dbConfig'
import CustomError from '@/utils/Error'
import Service from '@/modals/serviceModel';
import { CreateServiceSchema } from '@/schemas/serviceSchema';

await connect();
export async function POST(req) {
    try {
        const body = await req.json()
        const response = CreateServiceSchema.safeParse(body);
        if(!response.success){
            const {errors} = response.error;
            return NextResponse.json(CustomError.validationError(errors),{status:422})
        }
        body.price = parseInt(body.price);
        body.time = parseInt(body.time);

        const exist = await Service.findOne({
            $and:[
                {uid:body.uid},
                {category:body.category}
            ]
        })
        if(exist){
            return NextResponse.json(CustomError.badRequestError({message:"This service alrady exist "}),{status:400})
        }
        const service = await Service.create(body)
        const data = await Service.findOne({ _id: service._id })
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
            message: "create a new service",
        }, { status: 201 });

    } catch (error) {
        console.log(error)
        return NextResponse.json(CustomError.internalServerError(error), { status: 500 });
    }
}
export async function GET(req) {
    try {
        const data = await Service.find({})
            .sort({ 'createdAt': -1 })
            .populate([
                { path: 'category', select: '-createdAt -updatedAt -__v' },
                { path: 'uid', select: 'name' },
                { path: 'reviews', select: '_id rating' }
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