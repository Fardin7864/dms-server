import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        require: true,
    },
    qnt: {
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
        require: true,
        default: new Date()
    },
    status: {
        type: String,
        Enumerator: ['Painding', 'Chanceled', 'Deliverired'],
        require: true,
        default: 'Painding',
    }
},{timestamps: true});

export const  Order = mongoose.model('Order', orderSchema)