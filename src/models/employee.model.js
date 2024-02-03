import mongoose, { model } from "mongoose";

const employeeSchema = new mongoose.Schema({
employeeName: {
    type: String,
    require: true,
},
email: {
    type: String,
    require: true,
},
company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    require: true,
},
designation: {
    type: String,
    require: true,
},
address: {
    address:{type: String},
    mobile: {type: String, require: true},
},
startingDate: {
    type: Date,
}
},{timestamps: true})

export const Employee = mongoose.model('Employee', employeeSchema);