import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
employeeName: {
    type: String,
    required: true,
},
email: {
    type: String,
    required: true,
},
company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true,
},
designation: {
    type: String,
    required: true,
},
 mobile: {
    type: String, 
    required: true
},
startingDate: {
    type: Date,
}
},{timestamps: true})

export const Employee = mongoose.model('Employee', employeeSchema);