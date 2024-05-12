import { NextResponse } from 'next/server'
import { connect } from '@/db/dbConfig'
import Category from '@/modals/categoryModel'
import CustomError from '@/utils/Error'
import mongoose from 'mongoose'

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
    await Category.updateOne({ _id: id },{ $set: body });
    const data = await Category.aggregate([
      {$match: { _id: new mongoose.Types.ObjectId(id)}},
      { $addFields: { id: '$_id', links: { self: "/agency/dashboard/category" } } },
      { $project: { _id: 0, __v: 0 } }
    ]).exec();

    return NextResponse.json({     
      message: "catagory updateed successfully",
      data,
      success: true
    })

  } catch (error) {
    return NextResponse.json(CustomError.internalServerError(error), { status: 500 })
  }
}
export async function DELETE(req, context) {
  try {
    const {id} = context.params;
    const data = Category.find({_id:id})
    if(!data){
      return NextResponse.json(CustomError.notFoundError({message:"Not found! The requested resounce wes not found"}), { status: 404 })
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