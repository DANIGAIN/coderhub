import Contact from "@/modals/contactModel";
import CustomError from "@/utils/Error";
import { NextResponse } from "next/server";

export async function DELETE(req, context) {
    const { id } = context.params;
    try {
        const exist = await Contact.findOne({ _id: id });
        if (!exist) {
            return NextResponse.json(CustomError.badRequestError({ message: "Requested Contact was not found " }), { status: 400 })
        }
    
        await Contact.deleteOne({ _id: id })
        return NextResponse.json({
            success: true,
            message: "Delete the contact successfully",
        }, { status: 200 });

    } catch (error) {
        return NextResponse.json(CustomError.internalServerError(error), { status: 500 });
    }
}