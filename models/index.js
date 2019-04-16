const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/ths19db',{ useNewUrlParser: true })

//import for student collection
module.exports.Student = require('./students')

//import School collection

module.exports.School = require('./schools')

//import USER collection
module.exports.USER = require('./users')