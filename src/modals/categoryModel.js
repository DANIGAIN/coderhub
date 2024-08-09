import mongoose from "mongoose";
const categorySchema = new mongoose.Schema({
    uid: {
        type: mongoose.Types.ObjectId,
        ref:'User'
    },
    name: {
        type: String,
        required: true,
        trim: true,
        lowerCase:true,
    },
    slug: {
        type: String
    },
    subcategoris:[{
        type:String
    }],
    status: {
        type: Boolean,
        required: true    
    },
    logo:{ 
        type: String
    },
    image:{
        type:String
    },
    description:{
        type:String,
        required: true
    },
   
}, {
    timestamps: true
});

const Category = mongoose.models.Category || mongoose.model("Category", categorySchema);
export default Category;
