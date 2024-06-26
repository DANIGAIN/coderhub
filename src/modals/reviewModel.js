import mongoose from "mongoose";
const reviewSchema = new mongoose.Schema({
    uid:{
        type: mongoose.Types.ObjectId,
        ref:'User'
    },
    comment:{
        type:String,
    },
    rating:{
        type: Number,
    }
}, {
    timestamps: true
});

const Review = mongoose.models.Review || mongoose.model("Review", reviewSchema);
export default Review;