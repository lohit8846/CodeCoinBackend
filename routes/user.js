var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');
var ac = require('./config/access');

/**
 * @api {post} /signup Create New User
 * @apiGroup Users
 * @apiParam {String} username username of new user
 * @apiParam {String} password password of new user
 * @apiParam {String} firstName first name of new user
 * @apiParam {String} email email of new user
 * @apiSuccess {String} Sign up is successful
 */
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


/**
 * @api {post} /login logs in the requesting user
 * @apiGroup Users
 * @apiSuccess {String} logged in user successfully
 */
router.post('/login',
    passport.authenticate('local'),
    function(req, res) {
        // If this function gets called, authentication was successful.
        // `req.user` contains the authenticated user.
        req.user.password = null;
        res.json(req.user);
    });

/**
 * @api {post} /logout logs out the requesting user
 * @apiGroup Users
 * @apiSuccess {String} user is logged out
 */
router.get('/logout', ac.ensureAccess(), function(req, res) {
    username = req.user.username;
    req.logout();
    res.send(username + " is logged out");

});



module.exports = router;