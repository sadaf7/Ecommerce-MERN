const catchAsyncErrors = require("../middlewares/catchAsyncError");
const Order = require("../models/OrderModel");
const Product = require("../models/ProductModel");
const ErrorHandler = require("../utils/ErrorHandler");

// creating new order
exports.newOrder = catchAsyncErrors(async(req,res,next)=>{
    const {shippingInfo,orderItems,paymentInfo,itemsPrice,shippingPrice,taxPrice,totalPrice,orderStatus}=req.body;

    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
        user: req.user.id,
        paidAt: Date.now()
    });

    res.status(201).json({
        success: true,
        order
    })
})

// get single order --- admin
exports.getSingleOrder = catchAsyncErrors(async(req,res,next)=>{
    const order = await Order.findById(req.params.id).populate('user','name email')

    if(!order){
        return next(new ErrorHandler('order not found',404))
    }

    res.status(200).json({
        success: true,
        order
    })
})

// get my order
exports.myOrder = catchAsyncErrors(async(req,res,next)=>{
    const order = await Order.find({user: req.user.id})

    res.status(200).json({
        success: true,
        order
    })
})

// get my order --- admin
exports.getAllOrders = catchAsyncErrors(async(req,res,next)=>{
    const order = await Order.find()

    let totalAmount = 0;

    order.forEach(order=>{
        totalAmount += order.totalPrice
    })

    res.status(200).json({
        success: true,
        order,
        totalAmount
    })
})

// Update order status --- admin
exports.updateOrderStatus = catchAsyncErrors(async(req,res,next)=>{
    const order = await Order.findById(req.params.id)

    if(!order){
        return next(new ErrorHandler('Order not found',404))
    }
    
    if(order.orderStatus === 'Delivered'){
        return next(new ErrorHandler('This Order is already delivered',400))
    }

    if(req.body.status === "Shipped"){
        order.orderItems.forEach(async(order)=>{
            await updateStock(order.product,order.quantity)
        })
    }

    order.orderStatus = req.body.status

    if(order.orderStatus === 'Delivered'){
        order.deliveredAt = Date.now()
    }

    await order.save({validateBeforeSave: false})

    res.status(200).json({
        success: true,
        order,
    })
})

// updating stock
async function updateStock(id,quantity){
    const product = await Product.findById(id)

    product.stock -= quantity

    await product.save({validateBeforeSave: false})
}

// delete order
exports.deleteOrder = catchAsyncErrors(async (req,res,next)=>{
    const order = await Order.findById(req.params.id)

    if(!order){
        return next(new ErrorHandler('Order not found',404))
    }

    await Order.findByIdAndDelete(order._id)

    res.status(200).json({
        success: true,
        message: 'Order deleted successfully'
    })
})