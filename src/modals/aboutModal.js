import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema({
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

const About = mongoose.models.About || mongoose.model("About", roleSchema);
export default About;
