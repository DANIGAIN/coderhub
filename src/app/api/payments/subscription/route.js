import { connect } from "@/db/dbConfig";
import CustomError from "@/utils/Error";
import Stripe from "stripe";
import { NextResponse } from "next/server";
import Payment from "@/modals/paymentModel";
await connect();
export async function POST(req) {
    try {
        const { price, quantity, planId} = await req.json()
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
              price,
              planId
            },
            success_url: `${process.env.NEXT_PUBLIC_DOMAIN}/success?session_id={CHECKOUT_SESSION_ID}&mode=subscription`,
            cancel_url: `${process.env.NEXT_PUBLIC_DOMAIN}/home`
          });

        return NextResponse.json({
            success: true,
            data: { url: session.url },
            message: "status unpaid",
        }, { status: 201 });

    } catch (error) {
        return NextResponse.json(CustomError.internalServerError(error), { status: 500 });
    }
}

export async function GET(req,){
  try{
      const search = new URL(req.url).searchParams;
      const data = await Payment.findOne({uid:search.get('uid')})
      return NextResponse.json({
        success:true,
        data,
        message:"Get this Payment"
      })

  }catch(error){
    return NextResponse.json(CustomError.internalServerError(error) ,{status:500})
  }
}