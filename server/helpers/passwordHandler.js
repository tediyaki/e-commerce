const bcrypt = require('bcryptjs')

function passwordHash(pass) {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(pass, salt);

    return hash
}

function compareHash(inputPass, dbPass) {
    return bcrypt.compareSync(inputPass, dbPass);
}

module.exports = {
    passwordHash,
    compareHash
}