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
    specialist:{
        type:String,
        maxLength:255
    },
    skill:[{
        type:String,
        maxLength:255
    }],
    links:[{
        type:String,
        maxLength:255
    }],
    isOneline:{
         type:Boolean,
         default:false
    },
    isSubscribe:{
        type:Boolean,
        default:false
    },
    
}, {
    timestamps: true
});

const About = mongoose.models.About || mongoose.model("About", aboutSchema);
export default About;
