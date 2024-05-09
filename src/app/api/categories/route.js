import { NextResponse } from 'next/server'
import { connect } from '@/db/dbConfig'
import { upload } from '@/helpers/upload'
import Category from '@/modals/categoryModel'
import CustomError from '@/utils/Error'

await connect()

export async function POST(request) {
  try {
    const formData = await request.formData()
    const obj = {}
    if (formData.get('image')) {
      const img = await upload(formData.get('image') || null, 'category')
      if (img.error) {
        return NextResponse.json(CustomError.notFoundError(ing.error), { status: 404 })
      }
      obj.image = img.image
    }
    if (formData.get('logo')) {
      const logo = await upload(formData.get('logo') || null, 'category')
      if (logo.error) {
        return NextResponse.json(CustomError.notFoundError(ing.error), { status: 404 })
      }
      obj.logo = logo.image
    }
    obj.name = formData.get('name')|| null ;
    obj.description = formData.get('description')|| null;

    if(!obj.name || !obj.description){
      return NextResponse.json(CustomError.badRequestError({message:"Name and description are required fields"}), { status: 400})
    }
    if (formData.get('slug')) {
      obj.slug = formData.get('slug')
    }
    obj.status = formData.get('status')

    if (formData.get('subcategoris').split(',').length) {
      obj.subcategoris = formData.get('subcategoris').split(',')
    }
   
    const data = await Category.create(obj)
     
    return NextResponse.json({
      success: true,
      data,
      message: "category created successfully"
    })
  } catch (err) {
    return NextResponse.json(CustomError.internalServerError(err), { status: 500 })
  }
}
export async function GET(){
  try{
    const catagory = await Category.find({});
    // return NextResponse.json({
    //   message:"catagory founed",
    //   data,     
    //   success:true 
    // })
         
  }catch(error){
    return NextResponse.json({
      message:error.message,
      success:false,
      error:error
    })
  }
}