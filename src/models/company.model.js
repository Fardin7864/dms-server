import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true
    },
    groupe: {
        type: String,
        required: true,
    }
},{timestamps: true})

export const Company = mongoose.model('Company', companySchema);
