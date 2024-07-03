import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    uid: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    checkout_id: {
        type: String,
        required: true
    },
    payment_status: {
        type: String
    },
    amount: {
        type: String,
        required: true,
    },
    mode: {
        type: String,
        require: true,
    },
    method: {
        type: String,
        required: true,
    },
    planId: {
        type: String
    },
}, {
    timestamps: true
});

const Payment = mongoose.models.Payment || mongoose.model("Payment", paymentSchema);
export default Payment;