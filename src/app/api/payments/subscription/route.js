import { connect } from "@/db/dbConfig";
import { NextResponse } from "next/server";
import CustomError from "@/utils/Error";
import Stripe from "stripe";
await connect();
export async function POST(req) {
    try {
        const body = await req.json()
        const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIBE_SECRET_KEY)
        console.log('ok')
        const seesion = await stripe.checkout.sessions.create({
            line_items:[body],
            mode:"subscription",
            automatic_tax: {
                enabled: true,
              },
            
          
            success_url:`${process.env.DOMAIN}/home`,
            cancel_url:`${process.env.DOMAIN}/home`
        })

       console.log(seesion)
         
        return NextResponse.json({
            success: true,
            data,
            message: "create a new map successfully",
        }, { status: 201 });

    } catch (error) {
        return NextResponse.json(CustomError.internalServerError(error), { status: 500 });
    }
}