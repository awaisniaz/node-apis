const mongoose = require('mongoose')
const user = new mongoose.Schema({
    name: {
        type: String,
        default: 'user',
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: Object,
        require: true
    },
    confirm_password: {
        type: Object,
        require: true
    },
    signindate: {
        type: Date,
        default: new Date()

    },
    profile_pic: {
        type: Object,
    }
})

const usermodel = mongoose.model('User', user)

module.exports = usermodel