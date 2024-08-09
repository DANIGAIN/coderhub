import { NextResponse } from 'next/server'
import Contact from '@/modals/contactModel'
import { connect } from '@/db/dbConfig'
import ContactSchema from '@/schemas/contactSchema'
import CustomError from '@/utils/Error'

await connect()

export async function POST(request) {
    try {
        const body = await request.json()
        const { name, uid, subject , message } = body
        const response = ContactSchema.safeParse(body);
        if (!response.success) {
            const { errors } = response.error;
            return NextResponse.json(CustomError.validationError(errors), { status: 422 })
        }

        const sevedConect = await Contact.create({ name, uid, subject, message})
        return NextResponse.json({
            success: true,
            sevedConect,
            message: "your query  send successfuly"
        } , {status:200 })

    } catch (err) {
        return NextResponse.json({
            success: false,
            error: err,
            message: "Contact can not seved"
        }, { status: 500 })

    }
}

export async function GET(req, res) {
   try{
      const data =await Contact.find({})
        .sort({createdAt:-1})
        .select('-__v -createdAt -updatedAt');
       return NextResponse.json({
        data,
        message:"Get all contacts successfully",
        success:true
       })
   }catch(error){
    return NextResponse.json(CustomError.internalServerError(error),{status:500})
   }    
}