const bcrypt = require('bcrypt')
const passwordEncoder = function (pass, callback) {
    let salt = 10
    return new Promise((resolve, reject) => {
        bcrypt.hash(pass, salt, (err, result) => {
            if (err) {
                reject(err)
            } else {
                resolve(result)
            }
        })
    })


}
module.exports = { passwordEncoder }