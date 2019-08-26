require('dotenv').config()

const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const router = require('./routes')
mongoose.connect(process.env.ATLAS_URI, {useNewUrlParser: true, useFindAndModify: false})
    .then(() => {
        console.log('connected to Atlas')
    }).catch(console.log)

app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use('/', router)

app.get('/', (req, res) => {
    res.json({message: 'connected'})
})

app.use((err, req, res, next) => {
    if(err) {
        if(err.name === 'ValidationError') {
            let errorList = [];
            for(let e in err.errors) {
                errorList.push(err.errors[e].message)
            }
            res.status(400).json(errorList)
        }
        else {
            if(!err.status) {
                err.status = 500
            }
            res.status(err.status).json(err.message || "Internal Server error")
        }
    }
})

module.exports = app