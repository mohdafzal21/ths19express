//routes
const express = require('express')
const router = express.Router()
const db = require('../models')

//list all school
router.get('/' ,(req,res)=>{
    db.School.find()
    .then((schoolData)=> res.render('schoolPage',{schoolData:schoolData}))
    .catch((err)=> res.send(err))
})



//post - 
router.post('/',(req,res)=>{
    db.School.create(req.body)
    .then((schoolData)=> res.redirect('/schools'))
    .catch((err)=> res.send(err))
})



module.exports = router;