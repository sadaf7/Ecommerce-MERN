const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema({
    shippingInfo: {
        city:{
            type: String,
            required: true
        },
        state:{
            type: String,
            required: true
        },
        country:{
            type: String,
            required: true
        },
        pinCode:{
            type: Number,
            required: true
        },
        phoneNo:{
            type: Number,
            required: true
        },
    },
    orderItems:[
        {
            name:{
                type: String,
                required: true
            },
            price:{
                type: Number,
                required: true
            },
            quantity:{
                type: Number,
                required: true
            },
            image:{
                type: String,
                required: true
            },
            product:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            }
        }
    ],
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    paymentInfo:{
            id:{
                type:String,
                required:true
            },
            status:{
                type:String,
                required:true
            },
    },
    paidAt:{
        type: Date,
        required: true
    },
    itemsPrice:{
        type:Number, // total items price
        required:true,
        default: 0
    },
    shippingPrice:{
        type:Number,
        required:true,
        default: 0
    },
    taxPrice:{
        type:Number,
        required:true,
        default: 0
    },
    totalPrice:{
        type:Number, // itemsPrice + shippingPrice + taxPrice
        required:true,
        default: 0
    },
    orderStatus:{
        type: String,
        required:true,
        default: "Processing"
    },
    deliveredAt: Date,
    createdAt:{
        type:Date,
        default: Date.now()
    }
})


const Order = mongoose.model('Order', orderSchema);
module.exports = Order;