import { NextResponse } from 'next/server'
import { connect } from '@/db/dbConfig'
import { upload } from '@/helpers/upload'
import Category from '@/modals/categoryModel'

await connect()

export async function POST(request) {
  try {
    const formData = await request.formData()
    const obj = {}
    if (formData.get('image')) {
      const img = await upload(formData.get('image') || null, 'category')
      if (img.error) {
        return NextResponse.json({
          success: false,
          message: img.error
        }, { status: 400 })
      }
      obj.image = img.image
    }


    if (formData.get('logo')) {
      const logo = await upload(formData.get('logo') || null, 'category')
      if (logo.error) {
        return NextResponse.json({
          success: false,
          message: logo.error
        }, { status: 400 })
      }
      obj.logo = logo.image
    }
 
    obj.name = formData.get('name')
    if (formData.get('slug')) {
      obj.slug = formData.get('slug')
    }
    if (formData.get('description')) {
      obj.description = formData.get('description')
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
    return NextResponse.json({
      success: false,
      message: err.message,
      error: err
    }, { status: 500 })
  }
}