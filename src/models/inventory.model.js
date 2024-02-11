import mongoose from "mongoose";


const inventorySchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    qty: {
        type: Number,
        required: true
    }
},{timestamps: true})


export const Inventory = mongoose.model('Inventory', inventorySchema)