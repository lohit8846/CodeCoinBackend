var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');
var ac = require('../config/access');

/*
router.post('/signup',function(req, res) {

    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;

    var newUser = new User({
        firstName : firstName,
        lastName : lastName,
        email : email,
        username: username,
        password : password
    });

    User.createUser(newUser, function(err, user) {
        if (err) {
            throw err;
        }
        else {
            res.send("Signup is successful");
        }
    });
});


router.post('/login',
    passport.authenticate('github2'),
    function(req, res) {
        // If this function gets called, authentication was successful.
        // `req.user` contains the authenticated user.
        req.user.password = null;
        res.json(req.user);
    });
*/

router.get('/getUser', ac.ensureAccess(), function(req, res) {
    return res.json(req.user);
});


router.get('/logout', ac.ensureAccess(), function(req, res) {
    username = req.user.login;
    req.logout();
    return res.send(username + " is logged out");

});



module.exports = router;