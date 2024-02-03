import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
    companyName: {
        type: String,
        require: true
    },
    groupe: {
        type: String,
        require: true,
    }
},{timestamps: true})

export const Company = mongoose.model('Company', companySchema);
