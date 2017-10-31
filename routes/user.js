var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


var User = require('../models/user');
var ac = require('../config/access');

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
router.get('/logout', ac.ensureAccess('read','user'), function(req, res) {
    username = req.user.username;
    req.logout();
    res.send(username + " is logged out");

});

passport.use(new LocalStrategy(
    function(username,password,done) {
        User.getUserByUsername(username, function(err, user) {
            if (err) {
                throw err;
            }
            if (!user) {
                return done(null, false, {message: 'Unknown User'});
            }

            User.comparePassword(password, user.password, function(err, isMatch) {
                if (err) {
                    throw err
                }
                if (isMatch) {
                    return done(null, user)
                } else {
                    return done(null, false, {message: 'Invalid Password'})
                }
            })

        })
    }
))


passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.getUserById(id, function(err, user) {
       done(err, user);
    });
})

module.exports = router;