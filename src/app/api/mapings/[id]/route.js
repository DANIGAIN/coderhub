import { NextResponse } from 'next/server'
import { connect } from '@/db/dbConfig'
import CustomError from '@/utils/Error'
import RC_Maping from '@/modals/mapingModal';

await connect();

export async function PUT(req, context) {
    const { id } = context.params;

    const data = await req.json();
    try {
        const map = await RC_Maping.findOne({ _id: id })
        if (!map) {
            return NextResponse.json(CustomError.notFoundError({ message: "This map not found" }), { status: 404 })
        }
        const maping = await RC_Maping.findOne({role:data.role,component: data.component})
        if(maping){
            return NextResponse.json(CustomError.badRequestError({message:"This map alrady exist"}), { status: 400 });
        }
       const res =  await RC_Maping.findByIdAndUpdate({ _id: id }, { $set: data }, { new: true })

        return NextResponse.json({
            success: true,
            message: "This user updated successfully",
        }, { status: 200 });

    } catch (error) {
        return NextResponse.json(CustomError.internalServerError(error), { status: 500 });
    }
}
