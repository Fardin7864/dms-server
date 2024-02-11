import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        require: true,
    },
    qty: {
        type: Number,
        require: true,
        default: 1
    },
    buyarName: {
        type: String,
        require: true,
    },
    buyarAddress: {
        type: String,
        require: true,
    },
    orderDate: {
        type: String,
        default: new Date()
    },
    status: {
        type: String,
        Enumerator: ['painding', 'chanceled', 'deliverired'],
        require: true,
        default: 'painding',
    }
},{timestamps: true});

export const  Order = mongoose.model('Order', orderSchema)