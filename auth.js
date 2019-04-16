mongoose    = require("mongoose"),
passport    = require("passport"),
cookieParser = require("cookie-parser"),
LocalStrategy = require("passport-local"),
flash        = require("connect-flash"),
session = require("express-session"),
//require moment
app.locals.moment = require('moment');


// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "test",
    resave: false,
    saveUninitialized: false
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.success = req.flash('success');
   res.locals.error = req.flash('error');
   next();
});

// ////////////////////////
// middleware
module.exports = {
    isLoggedIn: function(req, res, next){
        if(req.isAuthenticated()){
            return next();
        }
        req.flash('error', 'You must be signed in to do that!');
        res.redirect('/login');
    }}
///////////////////////////////////////////////////
var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    username: String,
    password: String,
});

UserSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model("User", UserSchema);
/////////////////////////////////////////////////////////////
var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User = require("../models/user");

//root route
router.get("/", function(req, res){
    res.render("landing");
});

// show register form
router.get("/register", function(req, res){
   res.render("register"); 
});

//handle sign up logic
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
   
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register", {error: err.message});
        }
        passport.authenticate("local")(req, res, function(){
           req.flash("success", "Successfully Signed Up! Nice to meet you " + req.body.username);
           res.redirect("/"); 
        });
    });
});

//show login form
router.get("/login", function(req, res){
   res.render("login"); 
});

//handling login logic
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/",
        failureRedirect: "/login",
        failureFlash: true,
        successFlash: 'Welcome to myapp!'
    }), function(req, res){
});

// logout route
router.get("/logout", function(req, res){
   req.logout();
   req.flash("success", "See you later!");
   res.redirect("/campgrounds");
});


module.exports = router;
///////////////////////////////////////////////////////////////////////////
// header.ejs
// <ul class="nav navbar-nav navbar-right">
// <% if(!currentUser){ %>
//     <li class="<%= typeof page !== 'undefined' && page === 'login' ? 'active' : '' %>"><a href="/login">Login</a></li>
//     <li class="<%= typeof page !== 'undefined' && page === 'register' ? 'active' : '' %>"><a href="/register">Sign Up</a></li>
// <% } else { %>
//     <li><a href="#">Signed In As <%= currentUser.username %></a></li>
//     <li><a href="/logout">Logout</a></li>
// <% } %>
// </ul>