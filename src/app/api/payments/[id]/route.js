import { connect } from "@/db/dbConfig";
import CustomError from "@/utils/Error";
import Payment from "@/modals/paymentModel";
import Stripe from "stripe";
import User from "@/modals/userModel";
import About from "@/modals/aboutModal";
import { NextResponse } from "next/server";
import Porposal from "@/modals/proposalModal";
await connect();
export async function POST(req, context) {
    try {
        const { uid} = await req.json()
        const checkout = context.params;
        const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIBE_SECRET_KEY)
        const session = await stripe.checkout.sessions.retrieve(checkout.id);
        const obj = {};
        obj.uid = uid;
        obj.checkout_id = session.id;
        obj.payment_status = session.payment_status;
        obj.amount = session.amount_total / 100 ;
        obj.service = session.metadata.service;
        obj.mode = session.mode;
        obj.method = 'stripe'; 
        let data = await Payment.findOne({ checkout_id:session.id })  
        if (!data && session) {
            data = await Payment.create(obj);
            if(data){
                
                await Porposal.findOneAndUpdate({service:obj.service},{$set:{status:'paid', updatedAt:new Date()}},{new:true})
            }
        }
        console.log(data); 
        return NextResponse.json({
            success: true,
            data,
            message: "Payment successfully",
        }, { status: 201 });

    } catch (error) {
        return NextResponse.json(CustomError.internalServerError(error), { status: 500 });
    }
}
export async function DELETE(req, context) {
    try {
        const {id} = context.params;
        const payment = await Payment.findOne({_id:id});
        if(!payment){
            return NextResponse.json({
                success:false,
                message: "Requested record can not exist",
            }, { status: 400});
        }
        await Payment.findByIdAndDelete({_id:id})
        return NextResponse.json({
            success: true,
            message: "Record is deleted successfully",
        }, { status: 200});

    } catch (error) {
        return NextResponse.json(CustomError.internalServerError(error), { status: 500 });
    }
}