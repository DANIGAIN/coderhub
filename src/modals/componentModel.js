const mongoose = require('mongoose');
const componentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    isActive:{
        type:Boolean,
        default:true
    }
},{
    timestamps:true
})
const Component = mongoose.models.Component || mongoose.model("Component", componentSchema);
module.exports =  Component;