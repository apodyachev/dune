const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        max: 255
    },
    lastname: {
        type: String,
        required: true,
        max: 255
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 6
    },
    address:{
        type: String,
        required: true,
        min: 6,
        maz: 1024
    },
    date: {
        type: Date,
        default: Date.now
    },
    profilepicture: {
        type: String,
        default: ""
    }
})

module.exports = mongoose.model('User', userSchema)