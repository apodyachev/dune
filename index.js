const express = require('express')
const app = express()
const dotenv = require('dotenv')
const authRoute = require('./controllers/users')
const venue = require('./controllers/venues')
const home = require('./controllers/home')
const picture = require('./controllers/pictures')
const mongoose = require('mongoose')

dotenv.config()

mongoose.connect(process.env.DB, {useNewUrlParser: true}, ()=> console.log('Connected to database'))

app.use(express.json())

app.use('/', home)
app.use('/api/users', authRoute)
app.use('/api/venues', venue)
app.use('/api/pictures', picture)


app.listen(3000, () => console.log('listening on port 3000'))