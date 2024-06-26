// creating token and saving in cookie
const jwt = require('jsonwebtoken');


const sendToken = async(user,statusCode,res)=>{
    const token = user.getJwtToken();

    const cookieExpire = process.env.COOKIE_EXPIRE || 2;

    const options = {
        expires: new Date(
            Date.now() + cookieExpire * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
    }
    res.status(statusCode).cookie('token',token,options).json({
        success: true,
        user,
        token
    })
}

const generateToken =(id)=>{
    return jwt.sign({ id }, process.env.JWT_SEC, { expiresIn: '30d' });
}

module.exports = {sendToken,generateToken}