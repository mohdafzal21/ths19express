const express = require('express')
const app = express()
const path = require('path')
var bodyParser = require('body-parser')
var methodOverride = require('method-override')
const mongoose = require('mongoose')
//require model
const db = require('./models')
//passport require
const passport    = require("passport")
const cookieParser = require("cookie-parser")
const LocalStrategy = require("passport-local")
const flash        = require("connect-flash")
const session = require("express-session")
//require moment
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
//express.static - assests 
app.use(express.static(path.join(__dirname, 'public')))
//view engine 
app.set('view engine' , 'ejs')
//routes 
const indexRouter = require('./routes/index')
const studentRouter = require('./routes/student')
const productRouter = require('./routes/product')
const schoolRouter = require('./routes/school')
const userRouter = require('./routes/user')


const USER =db.USER

// PASSPORT CONFIGURATION
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
  }));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(USER.authenticate()));
passport.serializeUser(USER.serializeUser());
passport.deserializeUser(USER.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    
    next();
 });

 app.use('/' , indexRouter)
 app.use('/products', productRouter)
 app.use('/students' ,studentRouter)
 app.use('/schools', schoolRouter)
 app.use('/user',userRouter)
 app.listen(3000, ()=>console.log("port is running at 3000") )
















//get route
// app.get('/' ,(req,res)=>{
//    res.render('index', {people:people})
// })
// app.post('/',(req,res)=> {
//    console.log(req.body)
//    people.push(req.body.people)
//    res.redirect('/')
// })

// app.get('/home' ,(req,res)=>{
//    res.render('home', {people:people})
// })

 

  

