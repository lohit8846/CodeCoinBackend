var User = require('../models/user');
var GitHubStrategy = require('passport-github2').Strategy;


module.exports = function (app, passport) {

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

    passport.use(new GitHubStrategy({
            clientID: '96becea34d4f0b4cef03',
            clientSecret: 'e59ec4aa0d8cff115dba3cccb1763174be7941e3',
            callbackURL: "http://localhost:5000/auth/github/callback"
        },
        function (accessToken, refreshToken, profile, cb) {
            User.getUserByGithub(profile.id, function(err, user){
                if (!user) {
                    profileJson = profile._json;
                    var newUser = new User({
                        githubId : profileJson.id,
                        login: profileJson.login,
                        avatar_url: profileJson.avatar_url,
                        repos_url: profileJson.repos_url,
                        name: profileJson.name,
                        email: profileJson.email,
                        public_repos: profileJson.public_repos
                    });
                    User.createUser(newUser, function (err, user) {
                        return cb(err, user);
                    })
                }
                else {
                    return cb(err, user);
                }
            });
        }
    ));


    app.get('/auth/github',
        passport.authenticate('github', { scope: [ 'user', 'repo' ] }));

    app.get('/auth/github/callback',
        passport.authenticate('github', { failureRedirect: '/auth/github' }),
        function(req, res) {
            res.send('yay');
        });

    return passport

};
