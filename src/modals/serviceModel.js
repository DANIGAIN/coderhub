import mongoose from "mongoose";
import { reviewSchema } from "./reviewModel";

const serviceSchema = new mongoose.Schema({
    uid:{
        type: mongoose.Types.ObjectId,
        ref:'User',
        required:true
    },
    price: {
        type:Number,
        required: true
    },
    type:{
        type:String,
        required:true,
    },
    time:{
        type:Number,
        required:true,
    },
    category:{
        type: mongoose.Types.ObjectId,
        ref:'Category',
        required:true
    },   
    reviews: [{
        type: mongoose.Types.ObjectId,
        ref:'Review',
    }]
}, {
    timestamps: true
});

const Service = mongoose.models.Service || mongoose.model("Service", serviceSchema);
export default Service;