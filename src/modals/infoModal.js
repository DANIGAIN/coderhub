import mongoose from "mongoose";

const roleSchema = new mongoose.Schema({
    phone:{
        type:Number,
        minLength: 10,
        maxLength: 15
    },
    bio:{
        type:String,
        maxLength:500
    },
    isOneline:{
         type:Boolean,
         default:false
    },
    isSubscribe:{
        type:Boolean,
        default:false
    }
}, {
    timestamps: true
});

const Role = mongoose.models.Role || mongoose.model("Role", roleSchema);
export default Role;
