const ErrorHandler = require("../utils/ErrorHandler");


module.exports = (err,req,res,next)=>{
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 500;

    // mongodb cast error (_id)
    if(err.name === 'CastError'){
        const message = `Resource not found. Invalid  ${err.path}`;
        err = new ErrorHandler(message,400)
    }

    // mongoose duplicate key error
    if(err.name === 11000){
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
        err = new ErrorHandler(message,400)
    }

    // jwt token error
    if(err.name === 'JsonWebTokenError'){
        const message = `Json Web Token is invalid`;
        err = new ErrorHandler(message,400)
    }

    // jwt token expired
    if(err.name === 'TokenExpiredError'){
        const message = `Json Web Token is expired please try again`;
        err = new ErrorHandler(message,400)
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message
        // err: err.stack
    })
}