import mongoose from "mongoose";
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        lowerCase:true,
    },
    slug: {
        type: String
    },
    subcategory:[{
        type:mongoose.Types.ObjectId,
        ref:'Subcategory'
    }],
    status: {
        type: Boolean,
        required: true
    },
    logo:{ 
        type: String
    },
    description:{
        type:String,
    }
}, {
    timestamps: true
});

const Category = mongoose.models.Category || mongoose.model("Category", categorySchema);
export default Category;
