//user schema 
var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    name: String
});

module.exports = mongoose.model("User", UserSchema);
//////post schema
var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
    title: String,
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    comments: [{
        text: String,
        postedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    }]
});

module.exports = mongoose.model("Post", PostSchema);
////create users
require("./database");

var User = require('./User'),
    Post = require('./Post');


var alex = new User({
    name: "Alex"
});

var joe = new User({
    name: "Joe"
})

alex.save();
joe.save();
///////////create posts 
var user = {
    id: req.user._id,
    username: req.user.username
}
var post = new Post({
    title: "Hello World",
    postedBy: alex._id,
    comments: [{
        text: "Nice post!",
        postedBy: joe._id
    }, {
        text: "Thanks :)",
        postedBy: alex._id
    }]
})

///query a post
post.save(function(error) {
    if (!error) {
        Post.find({})
            .populate('postedBy')
            .populate('comments.postedBy')
            .exec(function(error, posts) {
                console.log(JSON.stringify(posts, null, "\t"))
            })
    }
});