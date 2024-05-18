import mongoose from "mongoose";

const PremiumPatientSchema = new mongoose.Schema({

    patient:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Patient",
        required:true
    },
    date:{
        type:Date,
        
    },
    isPremium:{
        type:Boolean,
        required:true
    },
    isValid:{
        type:Boolean,
        required:true
    }
}
,{timestamps:true})

export default mongoose.model("PremiumPatient", PremiumPatientSchema)