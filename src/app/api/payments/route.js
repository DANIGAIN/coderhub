import { connect } from "@/db/dbConfig";
import CustomError from "@/utils/Error";
import Stripe from "stripe";
import { NextResponse } from "next/server";
await connect();
export async function POST(req) {
    try {
        const {  service ,amount ,discount } = await req.json()
        
        const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIBE_SECRET_KEY)
        const coupon = await stripe.coupons.create({
          percent_off: discount.amount,
          duration: 'once',
          currency: 'usd'
        });

        const session = await stripe.checkout.sessions.create({
            line_items: [{
              price_data:{
                currency:'usd',
                product_data:{
                  name:'Service'
                },
                unit_amount:amount*100
              },
              quantity:1
            }],
            discounts: [{
              coupon: coupon.id
            }],
            mode: "payment",
            metadata:{
                service,
            },
            success_url: `${process.env.NEXT_PUBLIC_DOMAIN}/success?session_id={CHECKOUT_SESSION_ID}&mode=payment`,
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

