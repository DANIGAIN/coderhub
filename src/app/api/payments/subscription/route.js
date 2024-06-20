import { connect } from "@/db/dbConfig";
import { NextResponse } from "next/server";
import CustomError from "@/utils/Error";
import Subscription from "@/modals/subscriptionModel";
import Stripe from "stripe";
await connect();
export async function POST(req) {
    try {
        const { price, quantity, uid } = await req.json()

        const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIBE_SECRET_KEY)
        const seesion = await stripe.checkout.sessions.create({
            line_items: [{
                price,
                quantity
            }],
            mode: "subscription",
            automatic_tax: {
                enabled: true,
            },

            success_url: `${process.env.DOMAIN}/home`,
            cancel_url: `${process.env.DOMAIN}/home`
        })

        const obj = {};
        obj.uid = uid;
        obj.checkout_id = seesion.id;
        obj.tax = seesion.total_details.amount_tax;
        obj.status = seesion.status;
        obj.stripe_price_id = price;
        obj.created = seesion.created;
        obj.expires_at = seesion.expires_at;
        obj.status = seesion.status;
        obj.amount_total = seesion.amount_total;

        await Subscription.create(obj);


        return NextResponse.json({
            success: true,
            data: { url: seesion.url },
            message: "payment success",
        }, { status: 201 });

    } catch (error) {
        return NextResponse.json(CustomError.internalServerError(error), { status: 500 });
    }
}