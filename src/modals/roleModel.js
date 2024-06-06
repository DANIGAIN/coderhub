import mongoose from "mongoose";

const roleSchema = new mongoose.Schema({
    name: {
        type:String,
        required: true,
        trim: true,
        maxLength: 20
    },
    isActive:{
        type: Boolean,
        default: true,
        required:true
    }
  
}, {
    timestamps: true
});

const Role = mongoose.models.Role || mongoose.model("Role", roleSchema);
export default Role;