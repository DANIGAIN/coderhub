import mongoose from "mongoose";
const subcategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        lowerCase:true,
    } 
}, {
    timestamps: true
});

const Subcategory = mongoose.models.Subcategory || mongoose.model("Subcategory", subcategorySchema);
export default Subcategory;
