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
        required:true,
    },
    day: {
        type: Number,
        required:true,
    },
    title: {
        type: String,
        required:true,
    },
    description: {
        type: String,
        required:true
    },
    amount: {
        type: Number,
    },
    status: {
        type: String,
        default: "pending"
    }
}, {
    timestamps: true
});

const Porposal = mongoose.models.Porposal || mongoose.model("Porposal", proposalSchema);
export default Porposal;