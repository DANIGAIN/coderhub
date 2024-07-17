import { NextResponse } from 'next/server'
import { connect } from '@/db/dbConfig'
import CustomError from '@/utils/Error'
import RC_Maping from '@/modals/mapingModal';

await connect();
export async function POST(req) {
    try {
        const body = await req.json()
        const maping = await RC_Maping.findOne({role:body.role ,component: body.component})
        if(maping){
            return NextResponse.json(CustomError.badRequestError({message:"This map alrady exist"}), { status: 400 });
        }
        
        const map =  await RC_Maping.create(body)
        const data = await RC_Maping.findOne({_id: map._id})
        .populate('role','_id name')
        .populate('component','_id name')
        .select('-createdAt -updatedAt -__v')
        .exec();
        return NextResponse.json({
            success: true,
            data,
            message: "create a new map successfully",
        }, { status: 201 });

    } catch (error) {
        return NextResponse.json(CustomError.internalServerError(error), { status: 500 });
    }
}
export async function GET(req) {
    try {
        const url = new URL(req.url);
        const role = url.searchParams.get('role')|| null;
        let data = null ;
        if(role){
            data = await RC_Maping.find({role})
                .populate([{path:'component', select:'_id name'},{path:'role', select:'_id name'}])
                .select('-createdAt -updatedAt -__v')
                .exec();

        }else{
            data = await RC_Maping.find()
            .sort({'createdAt':-1})
            .populate('role','_id name')
            .populate('component','_id name')
            .select('-createdAt -updatedAt -__v')
            .exec();
        }
       
        return NextResponse.json({
            success: true,
            data,
            message: "Get all map successfully",
        }, { status: 200 });

    } catch (error) {
        return NextResponse.json(CustomError.internalServerError(error), { status: 500 });
    }
}