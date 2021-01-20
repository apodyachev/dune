const mongoose = require('mongoose')

const venueSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        max: 75
    },
    description: {
        type: String,
        required: true,
        max: 1024
    },
    address: {
        type: String,
        required: true,
        max: 1024,
        min: 6
    },
    owner: {
        type: String,
        required: true
    },
    public: {
        type: Boolean,
        default: false
    },
    dateposted: {
        type: Date,
        default: Date.now
    },
    profilepictue: {
        type: String,
        default: ""
    }
})

module.exports = mongoose.model('Venue', venueSchema)