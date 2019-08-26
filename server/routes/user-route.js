const router = require('express').Router()
const {userAuthentication} = require('../middlewares/authUser')

const UserController = require('../controllers/user-controller')

router.post('/register', UserController.register)
router.post('/login', UserController.login)

router.post('/cart/:productid', userAuthentication, UserController.addItemToCart)
router.patch('/cart/:cart_index', userAuthentication, UserController.removeItemFromCart)

module.exports = router