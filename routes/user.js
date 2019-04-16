const express = require('express')
const router = express.Router()
const db = require('../models')
const passport = require('passport')
router.get('/login',(req,res)=>{
  res.render('login')
})
router.get('/register',(req,res)=>{
  res.render('register')
})


//handle sign up logic
router.post("/register", function(req, res){
  var newUser = new db.USER({username: req.body.username});
 
  db.USER.register(newUser, req.body.password, function(err, user){
      if(err){
          console.log(err);
          return res.render("register", {error: err.message});
      }
      passport.authenticate("local")(req, res, function(){
         res.redirect("/"); 
      });
  });
});




//handling login logic
router.post("/login", passport.authenticate("local", 
   {
       successRedirect: "/",
       failureRedirect: "/user/login",
      
   }), function(req, res){
});

// logout route
router.get("/logout", function(req, res){
  req.logout();

  res.redirect("/");
});





module.exports = router;
