const Joi = require('@hapi/joi')

const uservalidation = (data) => {
    const Schema = Joi.object({
        firstname: Joi.string().required(),
        lastname: Joi.string().required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
        address: Joi.string().min(6).required()
    })
    return Schema.validate(data)
}

const loginvalidation = (data) => {
    const LSchema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    })
    return LSchema.validate(data)
}

const venuevalidation = (data) => {
    const Schema = Joi.object({
        name: Joi.string().max(75).required(),
        description: Joi.string().max(1024).required(),
        address: Joi.string().min(6).max(1024).required()
    })
    return Schema.validate(data)
}


module.exports.uservalidation = uservalidation
module.exports.loginvalidation = loginvalidation
module.exports.venuevalidation = venuevalidation