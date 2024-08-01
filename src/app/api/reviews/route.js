import { connect } from "@/db/dbConfig";
import Review from "@/modals/reviewModel";
import CustomError from "@/utils/Error";
import { NextResponse } from "next/server";
import Service from '@/modals/serviceModel';

await connect();

export async function POST(req) {
    try {
        const body = await req.json();
        const { service, uid, comment, rating } = body ;
        const data = await Review.create({ uid, comment, rating });
        await Service.findByIdAndUpdate({_id:service}, {
            $push: { reviews: data._id },
            $set:{updatedAt:new Date()}
         },{new:true})
        return NextResponse.json({
            success: true,
            data,
            message: "Review is created successfuly"
        }, { status: 201 })
    } catch (error) {
        return NextResponse.json(CustomError.internalServerError(error), { status: 500 })

    }
}

export async function GET(req) {
    try {
        const data = await Review.find()
        .sort({"createdAt":-1})
        .populate('uid','_id name  isVerified')
        .select('-__v');
        return NextResponse.json({
            success: true,
            data,
            message: "Get All reviews successfuly"
        }, { status: 201 })
    } catch (error) {
        return NextResponse.json(CustomError.internalServerError(error), { status: 500 })

    }
}