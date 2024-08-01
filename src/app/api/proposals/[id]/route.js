import Porposal from "@/modals/proposalModal";
import { CreateProposalAdminSchema, CreateProposalUserSchema } from "@/schemas/proposalSchema";
import CustomError from "@/utils/Error";
import { NextResponse } from "next/server";

export async function PUT(req,context) {
    try {
        const body = await req.json();
        const {id} = context.params;
        const response = !body.amount ? CreateProposalUserSchema.safeParse(body): CreateProposalAdminSchema.safeParse(body);
        if(!response.success){
            const {errors} = response.error;
            return NextResponse.json(CustomError.validationError(errors),{status:422})
        }
        const data = await Porposal.findByIdAndUpdate({_id:id},{$set:{...body, updatedAt:new Date()}}, {new:true})
       
        return NextResponse.json({
            success: true,
            data,
            message: "proposal is updated successfuly"
        }, { status: 201 })
    } catch (error) {
        return NextResponse.json(CustomError.internalServerError(error), { status: 500 });
    }
}