const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/chatapp', { useNewUrlParser: true, useUnifiedTopology: true });

const connection_check = mongoose.connection;

connection_check.once('open', () => {
    console.log('Hurry')
})

connection_check.on('error', () => {
    console.group('Sorry Try Again')
})