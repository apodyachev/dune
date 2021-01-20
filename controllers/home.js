const router = require('express').Router()
const path = require('path')
const verify = require('../validtoken')

router.get('/', (req, res) => {
    res.sendFile(path.normalize(__dirname + '/../resources/index.html'))
})

router.get('/secure',verify ,(req, res) => {
    res.send('<h1>Secured Data</h1>')
})

module.exports = router