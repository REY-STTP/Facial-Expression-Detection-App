require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const imageRoutes = require('./routes/images')
const userRoutes = require('./routes/user')

// Express app
const app = express()

// Middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// Routes
app.use('/api/images', imageRoutes)
app.use('/api/user', userRoutes)

// Connected to DB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // Listening Request
        app.listen(process.env.PORT, () => {
            console.log(`Facial Expression Detection App listening at http://localhost:${process.env.PORT}/`)
        })
    })
    .catch((error) => {
        console.log(error)
    })