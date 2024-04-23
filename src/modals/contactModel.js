import mongoose from "mongoose";
const connectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    uid: {
        type: mongoose.Types.ObjectId,
        ref:'User'
    },
    subject: {
        type: String ,
        required: true,
    },
    message:{
        type:String,
    }
}, {
    timestamps: true
});

const Contact = mongoose.models.Contact || mongoose.model("Contact", connectSchema);
export default Contact;
