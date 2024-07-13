import { connect } from "@/db/dbConfig";
import CustomError from "@/utils/Error";
import Payment from "@/modals/paymentModel";
import Stripe from "stripe";
import User from "@/modals/userModel";
import About from "@/modals/aboutModal";
import { NextResponse } from "next/server";
await connect();
export async function POST(req, context) {
    try {
        const { uid } = await req.json()
        const checkout = context.params;


        const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIBE_SECRET_KEY)
        const session = await stripe.checkout.sessions.retrieve(checkout.id);
        
        
        const obj = {};
        obj.uid = uid;
        obj.checkout_id = session.id;
        obj.payment_status = session.payment_status;
        obj.amount = session.amount_total / 100;
        obj.planId = session.metadata.planId;
        obj.mode = session.mode;
        obj.planId =session.metadata.planId;
        obj.method = 'stripe';        
        let data = await Payment.findOne({ uid:obj.uid})
        if (!data && session) {
            data = await Payment.create(obj);
            const user = await User.findOne({ _id: uid });
            if (!user.about) {
                const about = await About.create({ isSubscribe: true });
                await User.findByIdAndUpdate({ _id: uid }, { $set: { about: about._id } }, { new: true })
            } else {
                await About.findByIdAndUpdate({ _id: user.about }, { $set: { isSubscribe: true } }, { new: true })
            }
        }
        return NextResponse.json({
            success: true,
            data,
            message: "Payment successfully",
        }, { status: 201 });

    } catch (error) {
        return NextResponse.json(CustomError.internalServerError(error), { status: 500 });
    }
}