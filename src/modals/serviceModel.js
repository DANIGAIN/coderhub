import mongoose from "mongoose";

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
    category:{
        type: mongoose.Types.ObjectId,
        ref:'Category',
        required:true
    },
    tags:{
        type: String
    },
    reviews:[{
        type: mongoose.Types.ObjectId,
        ref:'Reviews'
    }]
  
}, {
    timestamps: true
});

const Service = mongoose.models.Service || mongoose.model("Service", serviceSchema);
export default Service;