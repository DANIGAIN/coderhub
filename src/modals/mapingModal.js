const mongoose = require('mongoose');
const mapingSchema = new mongoose.Schema({
    component:{
        type:mongoose.Types.ObjectId,
        ref:'Component',
    },
    role:{
        type:mongoose.Types.ObjectId,
        ref:'Role',
    }
}, { 
    timestamps:true,
});
mapingSchema.index({ component: 1, role: 1 }, { unique: true });
const RC_Maping = mongoose.models.RC_Maping || mongoose.model("RC_Maping", mapingSchema);
export default RC_Maping;