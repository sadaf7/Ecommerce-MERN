const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto')
const { Schema } = mongoose;

const userSchema = new Schema({
    name:{
        type: String,
        required: [true,'Please provide your name'],
        maxLength: [30,'Name cannont  be more than 30 characters'],
        // minLength: [4, 'Name must be at least 4 characters']
    },
    email:{
        type: String,
        required: [true,'Please provide your email'],
        unique: true,
        validate: [validator.isEmail,"Invalid Email"]
    },
    password:{
        type: String,
        required: [true,'Please provide your password'],
        minLength: [8,'Password should contain minimum of 8 characters'],
        select: false
    },
    avatar:{
        public_id:{
            type: String,
        },
        url:{
            type: String,
        },    
    },
    role:{
        type: String,
        default: 'user'
    },
    createdAt:{
        type: Date,
        default: Date.now()
    },

    resetPasswordToken: String,
    resetPasswordTokenExpire: Date

})
// Hashing Password
userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        next();
    }

    this.password = await bcrypt.hash(this.password,10)
})

// JWT token
userSchema.methods.getJwtToken=function(){
    return jwt.sign({id: this._id},process.env.JWT_SEC,{expiresIn: "2d"})
}

// comparing password
userSchema.methods.comparePassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}

// generating password reset token
userSchema.methods.generateResetPasswordToken = function(){

    // generating token
    const resetToken = crypto.randomBytes(20).toString('hex');

    // hashing and adding reset password token to userScema
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')

    this.resetPasswordTokenExpire = Date.now() + 15*60*1000

    return resetToken;
}

const User = mongoose.model('User', userSchema);
module.exports = User;