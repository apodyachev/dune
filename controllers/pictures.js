const router = require('express').Router()
const Picture = require('../models/picture')
const validator = require('../validator')
const verify = require('../validtoken')
const fs = require('fs')
const path = require('path')
const multer = require('multer')

const storage = multer.diskStorage({ 
    destination: (req, file, cb) => { 
        cb(null, 'uploads') 
    }, 
    filename: (req, file, cb) => { 
        cb(null, file.fieldname + '-' + Date.now()) 
    } 
})

const upload = multer({storage: storage})
  

router.get('/', async (req, res) => {
    try{
        const results = await Picture.find({})
        res.send(results)
    }catch(err){
        console.log(err)
        res.status(500).send('Server error!')
    }
})

router.get('/:id', async (req, res) => {
    try{
        const picture = await Picture.findById(req.params.id)
        res.send(picture)
    }catch(err){
        console.log(err)
        res.status(400).send('Server error!')
    }
})

router.post('/new', upload.single('data'), verify, (req, res) => {
    try{
        console.log('dirname: ' + __dirname)
        console.log('filename: ' + req.file)
        const x = fs.readFileSync(path.join(__dirname + '/../uploads/' + req.file.filename))
        const img = new Picture({owner: req.user._id, data: x})
        img.save()
        res.send(img)
    }catch(err){
        console.log(err)
        res.status(500).send(err)
    }
})

module.exports = router