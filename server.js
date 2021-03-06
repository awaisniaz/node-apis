const express = require('express')()
require('./database-connection/index')
const router = require('./routes/user/index')
const bodyParser = require('body-parser');
express.use(bodyParser.urlencoded({ extended: true }));
express.use(bodyParser.json())

express.use('/user', router)

express.listen(3000, () => {
    console.log('Congratulations')
})