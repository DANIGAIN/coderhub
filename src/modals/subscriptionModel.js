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
    stripe_price_id:{
        type:String,
    },
    created:{
        type: String
    },
    expires_at:{
        type: String
    },
    status:{
        type:String
    },
    tex:{
        type: Number
    },
    amount_total:{
        type: String
    }
}, {
    timestamps: true
});

const Subscription = mongoose.models.Subscription || mongoose.model("Subscription", subscriptionSchema);
export default Subscription;