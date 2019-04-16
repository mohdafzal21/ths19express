const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose');
const userSchema = new mongoose.Schema({
    username : String,
    password : String

})
userSchema.plugin(passportLocalMongoose);


const USER  = mongoose.model('USER', userSchema)

module.exports = USER;