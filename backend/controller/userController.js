const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncError");
const User = require("../models/UserModel");
const {sendToken,generateToken} = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require('crypto')
const cloudinary = require('cloudinary')

exports.registerUser = catchAsyncErrors(async(req,res,next)=>{
    const {name,email,password} = req.body;

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar,{
        folder:"avatars",
        width:150,
        crop:"scale"
    })

    const user = await User.create({
        name,
        email,
        password,
        avatar:{
            // public_id:'myCloud.public_id',
            // url:'myCloud.secure_url'
            public_id:myCloud.public_id,
            url:myCloud.secure_url
        }
    })

    await sendToken(user,201,res);
})

exports.loginUser = catchAsyncErrors(async(req,res,next)=>{
    const {email,password}=req.body;

    if(!email || !password){
        return next(new ErrorHandler("Pleaser provide  email and password",400));
    }
    // Checking valid email
    const user = await User.findOne({email}).select("+password");
    if(!user){
        return next(new ErrorHandler("Invalid email or password",400));
    }
    // Password check
    const isPasswordCheck = await user.comparePassword(password);
    if(!isPasswordCheck){
        return next(new ErrorHandler("Invalid email or password",400));
    }

    await sendToken(user,200,res);
})

// logout user
exports.logout = catchAsyncErrors(async(req,res,next)=>{
    res.cookie('token',null,{
        expires: new Date(Date.now()),
        httpOnly: true
    });
    res.status(200).json({
        success: true,
        message: 'loggedout'
    })
})

// forgot password
exports.forgotPassword = catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findOne({email: req.body.email});
    if(!user) {
      return next(new ErrorHandler(`No user found with this email`, 404))
    }
    
    // get reset token
    const resetToken = user.generateResetPasswordToken();

    await user.save({validateBeforeSave: false})

    const resetPasswordUrl = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`

    const message = `Your password reset token is : \n\n ${resetPasswordUrl} \n\n If you have not requested this please ignore`


    try {
        await sendEmail({
            email: user.email,
            subject: 'Ecommerce password recovery',
            message
        })
        res.status(200).json({
            success:true,
            message: `Email sent to  ${user.email} successfully`
        })
    } catch (error) {
        user.resetPasswordToken = undefined
        user.resetPasswordTokenExpire = undefined

        await user.save({validateBeforeSave: false})
        
        return next(new ErrorHandler(error.message,500));
    }
})

// reset password
exports.resetPassword = catchAsyncErrors(async(req,res,next)=>{

    // creating token hash 
    const resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordTokenExpire:{$gt:Date.now()}
    })
    if(!user){
        return next(new ErrorHandler("Invalid reset Password Token",400));
    }

    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler("Password doesn't matched",400));
    }

    user.password = req.body.password 
    user.resetPasswordToken = undefined
    user.resetPasswordTokenExpire = undefined

    await user.save();

    sendToken(user,200,res);
})

// get user details
exports.getUserDetails = catchAsyncErrors(async(req, res, next) => {
    const user = await User.findById(req.user.id)
    res.status(200).json({
        success: true,
        user
    });
})

// update password
exports.updatePassword = catchAsyncErrors(async (req, res, next) =>{
    const user = await User.findById(req.user.id).select('+password');

    // Password check
    const isPasswordCheck = await user.comparePassword(req.body.oldPassword);
    if(!isPasswordCheck){
        return next(new ErrorHandler("Invalid email or password",400));
    }

    if(req.body.newPassword !== req.body.confirmPassword){
        return next(new ErrorHandler("Password doesn't matched",400));
    }

    user.password = req.body.newPassword 
    await user.save()

    sendToken(user,200,res);
})

// update user profile
exports.updateProfile = catchAsyncErrors( async (req, res, next) =>{
    let newUserData = {
        name : req.body.name || req.user.name,
        email: req.body.email || req.user.email,
    }

    if(req.body.avatar !== ""){
        const user = await User.findById(req.user.id);
        const imageId = user.avatar.public_id;
        await cloudinary.v2.uploader.destroy(imageId);

        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar,{
            folder:"avatars",
            width:150,
            crop:"scale"
        })
        newUserData.avatar = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url
        }
    }
    

    const user = await  User.findByIdAndUpdate(req.user.id , newUserData , {
        new:true,
        runValidators:true,
        useFindAndModify:false
    })

    res.status(200).json({
        success: true,
        user
    })
})

// get all users(admin)
exports.getAllUsers = catchAsyncErrors(async(req,res,next)=>{
    const users = await User.find();
    res.status(200).json({
        success: true,
        users
    });
});

// get single user (admin)
exports.getUser = catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findById(req.params.id);
    res.status(200).json({
        success: true,
        user
    });
    if(!user){
        return next(new ErrorHandler("User not found",400));
    }
    res.status(200).json({
        success: true,
        user
    });
});

// update user role
exports.updateUserRole = catchAsyncErrors( async (req, res, next) =>{
    const newUserData = {
        name : req.body.name || req.user.name,
        email: req.body.email || req.user.email,
        role: req.body.role || req.user.role,
    }

    const user = await  User.findByIdAndUpdate(req.params.id , newUserData , {
        new:true,
        runValidators:true,
        useFindAndModify:false
    })

    res.status(200).json({
        success: true,
        user
    })
})

// delete user
exports.deleteUser = catchAsyncErrors( async (req, res, next) =>{

    const user = await  User.findByIdAndDelete(req.params.id)

    if(!user){
        return next(new ErrorHandler("User not found",400));
    }

    const imageId = user.avatar.public_id;
    await cloudinary.v2.uploader.destroy(imageId);

    res.status(200).json({
        success: true,
        message: 'User deleted'
    })
})
