import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        lowerCase:true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"]
    },
    password: {
        type: String,
    },
    providerId:{
        type: String
    },
    role: {
         type:mongoose.Types.ObjectId,
         ref:'Role'
    },
    isVerified: { 
        type: Boolean,
        default: false
    },
    image: {
        type: String
    },

    verifyToken: { 
        type: String
    },
    verifyTokenExpiry: { 
        type: Date
    },
    about:{
        type:mongoose.Types.ObjectId,
        ref:'About'
    }
}, {
    timestamps: true
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
