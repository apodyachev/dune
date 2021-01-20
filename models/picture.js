const { required } = require('@hapi/joi')
const mongoose = require('mongoose')

const pictureSchema = new mongoose.Schema({
    owner: {
        type: String,
        required: true
    },
    data: {
        type: Buffer,
        required: true
    }
})

module.exports = mongoose.model('Picture', pictureSchema)