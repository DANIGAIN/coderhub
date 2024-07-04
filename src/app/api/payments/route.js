import { connect } from "@/db/dbConfig";
import CustomError from "@/utils/Error";
import Stripe from "stripe";
import { NextResponse } from "next/server";
await connect();
export async function POST(req) {
    try {
        const { service, amount } = await req.json()
        
 
        const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIBE_SECRET_KEY)
        const session = await stripe.checkout.sessions.create({
            line_items: [{
              price,
              quantity
            }],
            mode: "subscription",
            automatic_tax: {
              enabled: true,
            },
            metadata:{
                service,
            },
            success_url: `${process.env.NEXT_PUBLIC_DOMAIN}/home?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXT_PUBLIC_DOMAIN}/home`
          });

        return NextResponse.json({
            success: true,
            data: { url: session.url },
            message: "Payment is Processing ",
        }, { status: 201 });

    } catch (error) {
        return NextResponse.json(CustomError.internalServerError(error), { status: 500 });
    }
}

