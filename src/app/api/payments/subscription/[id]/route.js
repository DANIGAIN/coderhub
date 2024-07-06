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

        // console.log(checkout)


        const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIBE_SECRET_KEY)
        const session = await stripe.checkout.sessions.retrieve(checkout.id);


        const obj = {};
        obj.uid = uid;
        obj.checkout_id = session.id;
        obj.tax = session.total_details.amount_tax;
        obj.created = session.created;
        obj.expires_at = session.expires_at;
        obj.payment_status = session.payment_status;
        obj.amount_total = session.amount_total;
        obj.planId = session.metadata.planId;
        obj.price = session.metadata.price;

        let data = await Payment.findOne({ uid })
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