const jwt = require('jsonwebtoken')

function userAuthentication(req, res, next) {
    try {
        const currentUser = jwt.verify(req.headers.token, process.env.JWT_SECRET)
        req.decoded = currentUser
        next()
    } catch (err) {
        next({status: 403, message: "You are not logged in"})
    }
}

function userAuthorization(req, res, next) {

}

module.exports = {
    userAuthentication,
    userAuthorization
}