var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
    githubId:{
        type:String,
        required: [true, 'githubId is required']
    },
    login:String,
    avatar_url:String,
    repos_url:String,
    name:String,
    email:String,
    public_repos:Number
});

const User = mongoose.model('user',UserSchema);
module.exports = User;

module.exports.getUserByGithub = function(githubId, callback) {
    var query = {githubId : githubId};
    User.findOne(query, callback);
};

module.exports.createUser = function(newUser, callback) {
    newUser.save(callback);
};

module.exports.getUserById = function(id, callback) {
    User.findById(id, callback);
};