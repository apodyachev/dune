const router = require('express').Router()
const User = require('../models/user')
const validator = require('../validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

router.post('/new', async (req, res) => {
    const result = validator.uservalidation(req.body)
    if (result.error) {
        res.status(400).send(result.error.details[0].message)
        return
    }

    const emailexists = await User.findOne({email: req.body.email})
    if (emailexists) {
        res.status(400).send('email already exists!')
        return
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    
    const user = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hashedPassword,
        address: req.body.address
    })
    try {
        const savedUser = await user.save()
        res.send({user: user._id})
    } catch(err) {
        console.log(err)
        res.status(400).send(err)
    }
})

router.post('/login', async (req, res) => {
    const result = validator.loginvalidation(req.body)
    if (result.error) {
        res.status(400).send(result.error.details[0].message)
        //console.log(result.error.details)
        return
    }

    const user = await User.findOne({email: req.body.email})
    if (!user) {
        res.status(400).send('email is wrong!')
        return
    }

    const validpass = await bcrypt.compare(req.body.password, user.password)
    if (!validpass) {
        res.status(400).send('password is wrong')
        return
    }

    const token = jwt.sign({_id: user._id}, process.env.SECRET)

    res.header('token', token).send(token)



})

module.exports = router