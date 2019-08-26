const User = require('../models/user-model')
const jwt = require('jsonwebtoken')
const {compareHash} = require('../helpers/passwordHandler')

class UserController {
    static register(req, res, next) {
        const {name, email, password} = req.body

        User.create({name, email, password})
            .then( user => {
                const {_id, name, email, cart} = user
                const token = jwt.sign({_id, name, email, cart}, process.env.JWT_SECRET )
                res.status(201).json({_id, name, email, token, cart})
            })
            .catch(next)
    }

    static login(req, res, next) {
        const {email, password} = req.body
        User.findOne({email: email.toLowerCase()})
            .then(user => {
                if(user) {
                    if(compareHash(password, user.password)) {
                        const {_id, name, email, cart} = user
                        const token = jwt.sign({_id, name, email, cart}, process.env.JWT_SECRET )
                        
                        res.status(200).json({_id, name, email, token, cart})
                    } else {
                        next({status: 400, message: "Wrong email / password"})
                    }
                } else {
                    next({status: 400, message: "Wrong email / password"})
                }
            })
            .catch(next)
    }

    static addItemToCart(req, res, next) {
        User.findByIdAndUpdate(req.decoded._id, {
            $push: {
                cart: req.params.productid
            }
        }, {new: true})
            .populate('cart', 'name description image')
            .exec((err, user) => {
                if(err) {
                    next(err)
                } else {
                    const {_id, name, email, cart} = user
                    res.status(201).json({_id, name, email, cart})
                }
            })
    }

    static removeItemFromCart(req, res, next) {
        User.findById(req.decoded._id)
            .then(user => {
                user.cart.splice(req.params.cart_index, 1)
                User.findByIdAndUpdate(req.decoded._id, {
                    $set: {
                        cart: user.cart
                    }
                }, {new: true})
                    .populate('cart', 'name description image')
                    .exec((err, user) => {
                        if(err) {
                            next(err)
                        } else {
                            const {_id, name, email, cart} = user
                            res.status(201).json({_id, name, email, cart})
                        }
                    })
            })
    }

}

module.exports = UserController