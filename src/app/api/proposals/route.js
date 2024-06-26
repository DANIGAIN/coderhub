import { connect } from "@/db/dbConfig";
import Porposal from "@/modals/proposalModal";
import CustomError from "@/utils/Error";
import { NextResponse } from "next/server";

await connect();

export async function POST(req) {
    try {
        const body = await req.json();
        body.day = parseInt(body.day)

        const data = await Porposal.create(body);
        return NextResponse.json({
            success: true,
            data,
            message: "proposal is created successfuly"
        }, { status: 201 })
    } catch (err) {
        return NextResponse.json(CustomError.internalServerError({ message: "proposal can not be created successfuly" }), { status: 500 })

    }
}

export async function GET(req) {
    try {
        const url = new URL(req.url)
        const uid = url.searchParams.get('uid');
        const service = url.searchParams.get('service');
        if (!service) {
            const data = await Porposal.find({ uid }).select('-__v -createdAt  -updatedAt')
            return NextResponse.json({
                success: true,
                data,
                message: "proposal get  successfuly"
            }, { status: 200 })
        } else if (uid && service) {
            const data = await Porposal.find({
                $and: [
                    { uid: uid },
                    { service: service }
                ]
            }).select('-__v -createdAt  -updatedAt')
            return NextResponse.json({
                success: true,
                data,
                message: "proposal get  successfuly"
            }, { status: 200 })

        }

        return NextResponse.json({
            success: true,
            data: null,
            message: "proposal get  successfuly"
        }, { status: 200 })

    } catch (error) {
        console.log(error)
        return NextResponse.json(CustomError.internalServerError(error), { status: 500 })

    }
}