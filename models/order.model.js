const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderModel = new Schema({
    userId: {
        type: String,
        required: true,
    },
    product: [
        {
            productId: {
                type: String,
            },
            quantity: {
                type: Number,
                default: 1,
            },
        },  
    ],
    address: {
        type: Object,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        default: "pending",
    },
    
}, { timestamps: true, });

module.exports = mongoose.model("order", orderModel);
     
