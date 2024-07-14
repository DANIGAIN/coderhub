import { NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import User from '@/modals/userModel'
import About from '@/modals/aboutModal'
import { connect } from '@/db/dbConfig'
import Role from '@/modals/roleModel'
import CustomError from '@/utils/Error'
import { upload } from '@/helpers/upload'
import CreatUserSchema from '@/schemas/userSchema'

await connect()

export async function GET(req, res) {
    try {
        const data = await User.find()
            .sort({'createdAt':-1})
            .populate({ path: 'about', populate: { path: 'specialist' } })
            .populate('role')
            .select('-createdAt -updateAt -__v -password');
        return NextResponse.json({
            success: true,
            data,
            message: "All user get successfully"
        }, { status: 200 })

    } catch (error) {
        return NextResponse.json(CustomError.internalServerError(error), { status: 500 })

    }
}

export async function POST(req) {
    try {
        const body = await req.formData()
        const obj = {};
        const response = CreatUserSchema.safeParse(Object.fromEntries(body));
        if (!response.success) {
            const { errors } = response.error;
            return NextResponse.json(CustomError.validationError(errors), { status: 422 })
        }
        const exist  =  await User.findOne({email:body.get('email')})
        if(exist){
            return NextResponse.json(CustomError.badRequestError({message:"user alrady exsit"}),{status:422})
        }
        body.get('phone') ? obj.phone = body.get('phone') : null
        body.get('specialist') ? obj.specialist = body.get('specialist'): null ;
        body.get('bio') ? obj.bio = body.get('bio'): null ;
        body.get('skill') ? obj.skill = body.get('skill').split(','):null;
        const about = await About.create(obj);

        const solt = await bcryptjs.genSalt(10)
        const role = await Role.findOne({name:'Supper-Admin',isActive: true});
        let user ;
        const userobj = {};

        if (body.get('image')) {
            const img = await upload(body.get('image') || null, 'users')
            if (!img.image) {
                return NextResponse.json(CustomError.notFoundError(img.error), { status: 404 })
            }
            userobj.image = `/users/${img.image}`
        }
        
        if(about){
            userobj.about = about._id;
        }
        userobj.password =  await bcryptjs.hash(body.get('password'), solt),
        userobj.role = role._id,
        userobj.name = body.get('name'),
        userobj.email = body.get('email'),
        user = await User.create(userobj);
       
        const data = await User.findOne({_id:user._id})
            .populate({ path: 'about', populate: { path: 'specialist' } })
            .populate('role')
            .select('-createdAt -updateAt -__v -password');
        return NextResponse.json({
            success: true,
            data,
            message: "User is created successfuly"
        }, { status: 200 })

    } catch (err) {
        return NextResponse.json({
            success: false,
            error: err,
            message: "User can not Created"
        }, { status: 500 })

    }
}