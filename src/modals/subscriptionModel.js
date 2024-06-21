import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    uid:{
        type: mongoose.Types.ObjectId,
        ref:'User',
        required:true
    },
    checkout_id:{
        type:String,
    },
    created:{
        type: String
    },
    expires_at:{
        type: String
    },
    payment_status:{
        type:String
    },
    tex:{
        type: Number
    },
    amount_total:{
        type: String
    },
    planId:{
        type: String 
    },
    price:{
        type: String,
    }
}, {
    timestamps: true
});

const Subscription = mongoose.models.Subscription || mongoose.model("Subscription", subscriptionSchema);
export default Subscription;