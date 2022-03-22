const mongoose =  require('mongoose')

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/mernAuthLesson'

mongoose.connect(MONGODB_URI)

const db = mongoose.connection

db.once('open', ()=> console.log(`${db.host}:${db.port}`))

db.on('error', err => console.log(err, 'this aint working'))

module.exports.User = require('./user')