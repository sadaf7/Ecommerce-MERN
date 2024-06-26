const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
    name:{
        type: String,
        required: [true, 'Please provide a name for the product']
    },
    description:{
        type: String,
        required: [true, 'Please provide a description for the product']
    },
    price:{
        type: Number,
        required: [true, 'Price is required'],
    },
    ratings:{
        type:Number,
        default: 0
    },
    images:[
        {
            public_id:{
                type: String,
                required: true
            },
            url:{
                type: String,
                required: true
            },
        }
    ],
    category:{
        type: String,
        required: [true,'Category field cannot be empty']
    },
    stock:{
        type: Number,
        required: [true, 'please enter stock  number'],
        default: 1
    },
    numOfReviews:{
        type: Number,
        default: 0
    },
    reviews:[
        {
            name:{
                type: String,
                required: [true, 'Name is required to leave a review'],
            },
            rating:{
                type:Number,
                required: [true, 'rating is required to leave a review'],
            },
            comment:{
                type: String,
                required: [true, 'comment is required to leave a review'],
            },
            user:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        }
    ],
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt:{
        type: Date,
        default: Date.now()
    }
    
})

const Product = mongoose.model('Product', productSchema);
module.exports = Product;