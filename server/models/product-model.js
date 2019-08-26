const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please enter product name']
    },
    description: {
        type: String,
        required: [true, 'Please enter product description']
    },
    image: String,
    stock: {
        type: Number,
        min: [0, 'Invalid stock number'],
    }
})

module.exports = mongoose.model('Product', productSchema)