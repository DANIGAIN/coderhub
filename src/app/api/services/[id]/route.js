import { NextResponse } from 'next/server'
import { connect } from '@/db/dbConfig'
import CustomError from '@/utils/Error'
import Service from '@/modals/serviceModel';

await connect();
export async function GET(req,context) {
    const { id } = context.params;
    try {   
        const data = await Service.findOne({_id:id})
        .populate([
            { path: 'category', select: '-createdAt -updatedAt -__v' },
            { path: 'uid', select: 'name' }
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
export async function DELETE(req,context) {
    const { id } = context.params;
    try {   
        const service = await Service.find({_id:id})
        if(!service){
            return NextResponse.json({message:"Requested service was not found "})
        }
        await Service.deleteOne({_id: id})
        return NextResponse.json({
            success: true, 
            message: "Deleted the service successfully",
        }, { status: 200 });   

    } catch (error) {
        return NextResponse.json(CustomError.internalServerError(error), { status: 500 });
    }
}