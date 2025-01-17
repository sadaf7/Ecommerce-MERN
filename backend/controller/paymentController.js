const catchAsyncError = require('../middlewares/catchAsyncError')

const stripe = require('stripe')(process.env.STRIPE_SEC_KEY)


exports.processPayment = catchAsyncError(async(req,res,next)=>{
    const myPayment = await stripe.paymentIntents.create({
        amount:req.body.amount,
        currency:'usd',
        metadata:{
            company: 'Ecommerce'
        },
        
    })
    res.status(200).json({
        success:true,
        client_secret:myPayment.client_secret
    })
})
exports.sendApiKey = catchAsyncError(async(req,res,next)=>{
    res.status(200).json({
        stripeApiKey: process.env.STRIPE_API_KEY
    })
})