const express = require('express')
const router = express.Router()
const {isLoggedIn} = require('../middleware')
const people = ['geddy', 'neil', 'alex']

router.get('/', (req,res)=>{
    res.render('index',{people:people})
})

router.get('/home',isLoggedIn, (req,res)=> {
    res.render('home')
})

router.post('/',isLoggedIn,(req,res)=>{
    people.push(req.body.people)
    res.redirect('/')
})



module.exports = router