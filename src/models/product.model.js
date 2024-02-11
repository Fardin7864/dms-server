import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        require: true
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        require: true,
    },
    wet: {
        type: String,
        require: true
    },
    photo:{
        type: String,
    },

},{timestamps: true});

export const Product = mongoose.model('Product', productSchema)