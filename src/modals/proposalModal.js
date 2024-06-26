import mongoose from "mongoose";
const proposalSchema = new mongoose.Schema({
    uid: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    service: {
        type: mongoose.Types.ObjectId,
        ref: 'Service'
    },
    type: {
        type: String,
    },
    day: {
        type: Number,
    },
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    amount: {
        type: Number,
    }
}, {
    timestamps: true
});

const Porposal = mongoose.models.Porposal || mongoose.model("Porposal", proposalSchema);
export default Porposal;