const router = require('express').Router()
const Venue = require('../models/venue')
const validator = require('../validator')
const verify = require('../validtoken')

router.get('/', async (req, res) => {
    try {
        const venues = await Venue.find({public: true})
        res.send(venues)
    } catch(err) {
        console.log(err)
        res.send(err)
    }
})

router.get('/:id', async (req, res) => {
    try {
        const venue = await Venue.findById(req.params.id)
        res.send(venue)
    } catch(err) {
        console.log(err)
        res.send(err)
    }
})

router.post('/new', verify,  async (req, res) => {
    const result = validator.venuevalidation(req.body)
    if(result.error){
        res.status(400).send(result.error.details)
        return
    }
    const venue = new Venue({
        name: req.body.name,
        description: req.body.description,
        address: req.body.address,
        owner: req.user._id
    })
    try {
        const savedVenue = await venue.save()
        res.send(savedVenue)
    } catch(err) {
        console.log(err)
        res.status(400).send(err)
    }
})

router.put('/:id', verify, async(req, res) => {
    const result = validator.venuevalidation(req.body)
    if(result.error){
        res.status(400).send(result.error.details)
        return
    }
    try{
        const venue = await Venue.findById(req.params.id)
        if(!venue) {return res.status(404).send('venue not found')}
        if(venue.owner != req.user._id) {return res.status(401).send('you do not permission to edit')}
        const updatedvenue = await Venue.findOneAndUpdate({_id: req.params.id, owner: req.user._id},
            req.body,
            {new: true})
        res.send(updatedvenue)
    }catch(err){
        console.log(err)
        res.status(500).send('server error')
    }
})

router.delete('/:id', verify, (req, res) => {

    try {
        const venue = Venue.findById({_id: req.params.id})
        if(!venue) {
            res.status(404).send('no venue found!')
        }
        if(venue.owner !== req.user) {
            res.status(401).send('you do not have permission to delete!')
            return
        }
        Venue.deleteOne({_id: req.params.id})
        res.send('deletion succesful!')
    } catch(err) {
        console.log(err)
        res.status(400).send(err)
    }
})

module.exports = router