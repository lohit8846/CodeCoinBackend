var User = require('./models/user');
var LocalStrategy = require('passport-local').Strategy;


module.exports = function(app, passport) {

    // Passport init
    app.use(passport.initialize());
    app.use(passport.session());


    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.getUserById(id, function (err, user) {
            done(err, user);
        });
    });


    passport.use(new LocalStrategy(
        function (username, password, done) {
            User.getUserByUsername(username, function (err, user) {
                if (err) {
                    throw err;
                }
                if (!user) {
                    return done(null, false, {message: 'Unknown User'});
                }

                User.comparePassword(password, user.password, function (err, isMatch) {
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
    ));

    return passport

};
