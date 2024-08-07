import { NextResponse } from 'next/server'
import { connect } from '@/db/dbConfig'
import Category from '@/modals/categoryModel'
import CustomError from '@/utils/Error'
import mongoose from 'mongoose'
import Service from '@/modals/serviceModel'
import { UpdateCategorySchema } from '@/schemas/categorySchema'

await connect()

export async function GET(req, context) {
  try {
    const {id} = context.params ;
    const data = await Category.aggregate([
        {$match: { _id: new mongoose.Types.ObjectId(id)}},
        { $addFields: { id: '$_id', links: { self: "/agency/dashboard/category" } } },
        { $project: { _id: 0, __v: 0 } }
      ]).exec();
    if(!data.length){
        return NextResponse.json(CustomError.notFoundError({message:'This catagory can not exist'}), { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data:data[0],    
      message: "find a catagory successfully"
    }, { status: 200 })
  } catch (err) {
    return NextResponse.json(CustomError.internalServerError(err), { status: 500 })
  }
}
export async function PUT(req, context) {
  try {
    const {id} = context.params;
    const body  = await req.json()
    const response = UpdateCategorySchema.safeParse(body);    
    if(!response.success){
      const {errors} = response.error;
      return NextResponse.json(CustomError.validationError(errors), { status: 422 })
    }
    const data = await Category.findByIdAndUpdate({ _id: id },{ $set: {...body,updatedAt: new Date()} },{new:true});
    return NextResponse.json({
      data,     
      message: "catagory updateed successfully",
      success: true
    })

  } catch (error) {
    console.log(error)
    return NextResponse.json(CustomError.internalServerError(error), { status: 500 })
  }
}
export async function DELETE(req, context) {
  try {
    const {id} = context.params;
    const data = Category.find({_id:id})
    if(!data){
      return NextResponse.json(CustomError.badRequestError({message:"Not found! The requested resounce wes not found"}), { status: 400 })
    }
    const exsit = await Service.findOne({category:id})
    if(exsit){
      return NextResponse.json(CustomError.badRequestError({message:"This category can not be delete ! exist service collection"}), { status: 400 })
    }
    await Category.deleteOne({_id:id})

    return NextResponse.json({     
      message: "A category deleted successfuly",
      success: true
    })

  } catch (error) {
    return NextResponse.json(CustomError.internalServerError(error), { status: 500 })
  }
}