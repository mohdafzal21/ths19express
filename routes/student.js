const express = require('express')
const router = express.Router()
const db = require('../models')
const {isLoggedIn} = require('../middleware')
//get route -- all students
router.get('/', (req,res)=>{
    db.Student.find()
   .then((studentData) => res.json(studentData))
    .catch((err)=> res.send(err))
});


//post to insert data to db
router.post('/' ,isLoggedIn,(req,res)=>{
    console.log(req.user)
    const name = req.body.name
    const phone = req.body.phone
    const user = {
        id: req.user._id,
        username: req.user.username
    }
    const newStudent = {name:name, phone:phone, user:user}
    db.Student.create(newStudent)
    .then((studentData)=> res.json(studentData))
    .catch((err)=> res.send(err))
})

//find by id
router.get('/:id' , (req,res)=>{
    console.log(req.params.id)
    db.Student.findById(req.params.id).populate('username')
    .then((studentData)=> res.json(studentData))
    .catch((err)=> res.send(err))
})

//findbyID and update
router.put('/:id',(req,res)=>{
    db.Student.findByIdAndUpdate({_id:req.params.id},req.body)
    .then((studentData)=> res.json(studentData))
    .catch((err)=> res.send(err))
})

//delete 
router.delete('/:id',(req,res)=>{
    db.Student.findByIdAndDelete({_id:req.params.id})
    .then(res.send("student deleted"))
    .catch((err)=> res.send(err))
})





module.exports = router