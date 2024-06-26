const Product = require("../models/ProductModel");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncError");
const ApiFeatures = require("../utils/apiFeatures");
const cloudinary = require('cloudinary')


// create product -- Admin
exports.createProduct = catchAsyncErrors(async(req,res)=>{

    // let images = []

    // if(typeof req.body.images==='string'){
    //     images.push(req.body.images)
    // } else{
    //     images=req.body.images
    // }

    // const imagesLink = [];

    // for (let i = 0; i < images.length; i++) {
    //     const result = await cloudinary.v2.uploader.upload(images[i],{
    //         folder:"avatars"
    //     })

    //     imagesLink.push({
    //         public_id:result.public_id,
    //         url: result.secure_url
    //     })
    // }
    // req.body.images = imagesLink;

    req.body.user = req.user.id;
    const product = await Product.create(req.body);
    res.status(201).json({
        success:true,
        product
    });
})

// get all products
exports.getAllProducts = catchAsyncErrors(async(req,res,next)=>{

    const resultPerPage = 8;

    let apiFeature = new ApiFeatures(Product.find(), req.query).search().filter().pagination(resultPerPage)

    let products = await apiFeature.query
    
    let filteredProductsCount = products.length

    apiFeature.pagination(resultPerPage)

    const productCount = await Product.countDocuments()
    if(!products) {
        return next(new ErrorHandler('No products found',500))
    }
    res.status(200).json({
        success:true,
        products,
        productCount,
        resultPerPage,
        filteredProductsCount
    })
})

// exports.getAllProducts = catchAsyncErrors(async(req,res,next)=>{

// const resultPerPage = 8;
//   const productCount = await Product.countDocuments();

//   const apiFeature = new ApiFeatures(Product.find(), req.query)
//     .search()
//     .filter();

//   let products = await apiFeature.query;

//   let filteredProductsCount = products.length;

//   apiFeature.pagination(resultPerPage);

//   products = await apiFeature.query;

//     res.status(200).json({
//         success:true,
//         products,
//         productCount,
//         resultPerPage,
//         filteredProductsCount
//     })
// })

// get all products -- admin
exports.getAllProductsAdmin = catchAsyncErrors(async(req,res,next)=>{
    const products = await Product.find();
    res.status(200).json({
        success:true,
        products
    })
})

// update products -- admin
exports.updateProduct = catchAsyncErrors(async(req,res,next)=>{
    let product = await Product.findById(req.params.id)

    if(!product) {
        return next(new ErrorHandler('product not found',500))
    }

    let images = []

    if(typeof req.body.images==='string'){
        images.push(req.body.images)
    } else{
        images=req.body.images
    }
    
    if(images !== undefined){
        // Deleting images from cloudinary
        for (let i = 0; i < product.images.length; i++) {
            await cloudinary.v2.uploader.destroy(product.images[i].public_id)
        }

        let imagesLink = [];

    for (let i = 0; i < images.length; i++) {
        let result = await cloudinary.v2.uploader.upload(images[i],{
            folder:"avatars",
        })

        imagesLink.push({
            public_id: result.public_id,
            url: result.secure_url
        })

        req.body.images = imagesLink;
    }

    }

    


    product = await Product.findByIdAndUpdate(req.params.id, req.body ,{new: true, runValidators: true, useFindAndModify: false})

    res.status(200).json({
        success:true,
        product
    })
})

// get single product details
exports.getProductDetails = catchAsyncErrors(async(req,res,next)=>{
    let product = await Product.findById(req.params.id);

    if(!product) {
        return next(new ErrorHandler('product not found',500))
    }
    res.status(200).json({
        success:true,
        product
    })
})


// delete products -- admin
exports.deleteProduct = catchAsyncErrors(async (req,res)=> {
    let product = await Product.findById(req.params.id);

    if(!product) {
        return next(new ErrorHandler('product not found',500))
    }

    let images = []

    if(typeof req.body.images==='string'){
        images.push(req.body.images)
    } else{
        images=req.body.images
    }

    // Deleting images from cloudinary
    for (let i = 0; i < product.images.length; i++) {
        await cloudinary.v2.uploader.destroy(product.images[i].public_id)
    }

    product = await Product.findByIdAndDelete(product._id)

    res.status(200).json({
        success:true,
        msg:"Product Deleted successfully"
    })
})

// create or update review
exports.createProductReview = catchAsyncErrors(async (req,res)=> {
    const {rating , comment, productId} = req.body;

    const review = {
        user:req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment,
    };

    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find(rev => rev.user.toString() === req.user._id.toString());

    if(isReviewed){
        product.reviews.forEach((rev)=>{
            if(rev.user.toString()===req.user.id.toString()) {
                rev.rating=rating
                rev.comment=comment
            }
        })
    } else{
        product.reviews.push(review);
        product.numOfReviews =  product.reviews.length;
    }

    let avg = 0;
    product.reviews.forEach((rev)=>{
        avg += rev.rating;
    })
    
    product.ratings = avg/product.reviews.length;
    
    // save to database
    await product.save({validateBeforeSave : false});

    res.status(200).json({
        success: true,
    })
})

// get all reviews of a product
exports.getProductReviews = catchAsyncErrors(async(req,res,next)=>{
    const product = await Product.findById(req.query.id)

    if(!product){
        return next(new ErrorHandler('product not found',500))
    }

    res.status(200).json({
        success:true ,
        reviews: product.reviews
    })
})

// delete product reviews
exports.deleteProductReview = catchAsyncErrors(async (req,res,next)=>{
    const product = await Product.findById(req.query.productId)

    if(!product){
        return next(new ErrorHandler('product not found',500))
    }

    const reviews = product.reviews.filter(review => {
       return review._id.toString() !== req.query.id
    });

    let avg = 0;
    reviews.forEach((rev)=>{
        avg += rev.rating;
    })

    let ratings = 0;
    if(reviews.length===0){
        ratings = 0;
    } else{
        ratings = avg/reviews.length;
    }

    const numOfReviews = reviews.length;;
    
    await Product.findByIdAndUpdate(req.query.productId,{
        reviews,
        ratings,
        numOfReviews
    },{
        new : true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success:true ,
        reviews: product.reviews
    })
})