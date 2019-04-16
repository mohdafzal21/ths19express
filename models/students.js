const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    name:String,
    phone:Number,
    user: {
        id: {
           type: mongoose.Schema.Types.ObjectId,
           ref: "USER"
        },
        username: String
     },
})


const Student = mongoose.model('Student', studentSchema)

module.exports = Student;