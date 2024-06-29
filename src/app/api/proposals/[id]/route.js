import Porposal from "@/modals/proposalModal";
import CustomError from "@/utils/Error";
import { NextResponse } from "next/server";

export async function PUT(req,context) {
    try {
        const body = await req.json();
        body.day = parseInt(body.day)
        const {id} = context.params;
        await Porposal.findByIdAndUpdate({_id:id},{$set:body})
        return NextResponse.json({
            success: true,
            message: "proposal is updated successfuly"
        }, { status: 201 })
    } catch (error) {
        return NextResponse.json(CustomError.internalServerError(error), { status: 500 });
    }
}