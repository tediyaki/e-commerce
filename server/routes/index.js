const router = require('express').Router()

const userRouter = require('./user-route')
const productRouter = require('./product-route')

router.use('/user', userRouter)
router.use('/product', productRouter)

module.exports = router