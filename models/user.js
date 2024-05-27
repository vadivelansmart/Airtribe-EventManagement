const mongoose = require('mongoose');

 
const userSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: [true, "Full Name is required"],
    },
    email: {
        type: String,
        required: [true, "Email is not Provided"],
        unique: [true, "Email already Exists"],
        lowecase: true,
        trim: true,
        validate: {
            validator: (email) => {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
            },
            message: '{VALUE} is not a valid email!'
        }
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        required: [true, "Please specify the role"],
        default : "user"
    },
    password: {
        type: String,
        required: [true, "Password not Provided"],
        minlength: [8, "Password must have minimum 8 character"],
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model('User', userSchema)