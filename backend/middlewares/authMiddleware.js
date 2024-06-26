const User = require("../models/UserModel");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncError = require("./catchAsyncError");
const jwt = require("jsonwebtoken");


exports.isAuthenticated = catchAsyncError(async(req,res,next)=>{
    const {token} = req.cookies;
    
    if(!token){
        return next(new ErrorHandler('Please Login',401))
    }

    const decodedData = jwt.verify(token,process.env.JWt_SEC);

    req.user = await User.findById(decodedData.id)

    next();
})

exports.authorizedRoles=(...roles)=>{
    return (req, res, next)=>{
        if(!roles.includes(req.user.role)){
            return next(new ErrorHandler(`Role: ${req.user.role} isn't allowed to access this resources`,403))
        }

        next();
    }
}