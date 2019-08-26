const mongoose = require('mongoose')
const {passwordHash} = require('../helpers/passwordHandler')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name']
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        validate: {
            validator: function(value) {
                return /\S+@\S+\.\S+/.test(value)                
            },
            message: "This email is not valid"
        }
    },
    password: {
        type: String,
        required: [true, 'Please enter your password']
    },
    cart: [{ 
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: false
    }]
})

userSchema.pre('save', function(next) {
    this.password = passwordHash(this.password) 
    this.email = this.email.toLowerCase()
    next()
})

const User = mongoose.model('User', userSchema)

User.schema.path('email').validate(function(value, next) {
    return new Promise(function (resolve, reject) {
        User.findOne({email: value})
            .then(user => {
                if(user) {
                    reject(new Error("This email is already registered"))
                } else {
                    resolve()
                }
            })
            .catch(err => {throw err})

    })
})

module.exports = User