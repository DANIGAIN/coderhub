import { upload } from "@/helpers/upload";
import About from "@/modals/aboutModal";
import User from "@/modals/userModel";
import { NextResponse } from "next/server";


export async function PUT(req, context) {
    try {
        const body = await req.formData()
        const { id } = context.params;
        const obj = {};
        const userobj = {};
        if (body.get('phone')) obj.phone = body.get('phone');
        if (body.get('bio')) obj.bio = body.get('bio');
        if (body.get('role')) userobj.role = body.get('role');
        if (body.get('image')) {
            const img = await upload(body.get('image') || null, 'users')
            if (!img.image) {
                return NextResponse.json(CustomError.notFoundError(img.error), { status: 404 })
            }
            userobj.image = `/users/${img.image}`
        }
        const res = await User.findByIdAndUpdate({ _id: id }, { $set: userobj }, { new: true });
        if (res?.about) {
            await About.findByIdAndUpdate({ _id: res.about }, { $set: obj }, { new: true });
        } else {
            const res = await User.findOne({ _id: id });
            await About.findByIdAndUpdate({ _id: res.data.about }, { $set: obj }, { new: true });
        }

        const data = await User.findOne({ _id: id })
            .populate({ path: 'about', populate: { path: 'specialist' } })
            .populate('role')
            .select('-createdAt -updateAt -__v -password');

        return NextResponse.json({
            success: true,
            data,
            message: "User is updated successfuly"
        }, { status: 200 })

    } catch (err) {
        return NextResponse.json({
            success: false,
            error: err,
            message: "User can not Updated"
        }, { status: 500 })

    }
}