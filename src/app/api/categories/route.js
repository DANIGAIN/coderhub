import { NextResponse } from 'next/server'
import { connect } from '@/db/dbConfig'
import { upload } from '@/helpers/upload'
import Category from '@/modals/categoryModel'
import CustomError from '@/utils/Error'
import { CreateCategorySchema } from '@/schemas/categorySchema'

await connect()

export async function POST(req) {
  try {
    const formData = await req.formData()
    const obj = {}
    const response = CreateCategorySchema.safeParse(Object.fromEntries(formData));
        if (!response.success) {
            const { errors } = response.error;
            return NextResponse.json(CustomError.validationError(errors), { status: 422 })
    }

    const exist = await Category.findOne({name:formData.get('name')});
    if(exist){
      return NextResponse.json(CustomError.badRequestError({message:"Exist this category"}), { status: 400 })
    }
    if (formData.get('image')) {
      const img = await upload(formData.get('image') || null, 'category')
      if (!img.image) {
        return NextResponse.json(CustomError.validationError(img.error), { status: 422 })
      }
      obj.image = img.image
    }
    if (formData.get('logo')) {
      const logo = await upload(formData.get('logo') || null, 'category')
      if (!logo.image) {
        return NextResponse.json(CustomError.validationError(logo.error), { status:422 })
      }
      obj.logo = logo.image
    }
    obj.name = formData.get('name') || null;
    obj.description = formData.get('description') || null;

    if (!obj.name || !obj.description) {
      return NextResponse.json(CustomError.badRequestError({ message: "Name and description are required fields" }), { status: 422 })
    }
    if (formData.get('slug')) {
      obj.slug = formData.get('slug')
    }
    obj.status = formData.get('status');
    const sub = formData.get('subcategoris').split(',')
    if (sub.length && sub[0].length) {
      obj.subcategoris = formData.get('subcategoris').split(',')
    }

    const data = await Category.create(obj);
    return NextResponse.json({
      success: true,
      data,
      message: "category created successfully"
    }, { status: 201 })
  } catch (err) {
    return NextResponse.json(CustomError.internalServerError(err), { status: 500 })
  }
}
export async function GET(req, res) {
  try {
    const url = new URL(req.url);
    const name = url.searchParams.get('search') || '';
    const data = await Category.aggregate([
      { $match: { name: { $regex: name, $options: 'i' } } },
      { $addFields: { id: { $toString: '$_id' }, links: { self: "/agency/dashboard/category" } } },
      { $project: { __v: 0, _id: 0 } }
    ]).sort({'createdAt':-1}).exec()
    return NextResponse.json({
      message: "catagory founed",
      data,
      success: true
    })

  } catch (error) {
    return NextResponse.json(CustomError.internalServerError(error), { status: 500 })
  }
}
