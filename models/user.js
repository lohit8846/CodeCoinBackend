var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var UserSchema = mongoose.Schema({
    username: {
        type:String,
        unique: true,
        required: [true, 'Username is required'],
        index: true
    },
    firstName:String,
    lastName:String,
    email: {
        type:String,
        required: [true, 'Email is required']
    },
    password: {
        type:String,
        required: [true, 'password is required']
    },
    role: {
        type: [{
            type: String,
            enum: ['super', 'admin', 'member', 'everyone']
        }],
        default: ['everyone']
    }
});

const User = mongoose.model('user',UserSchema);
module.exports = User;


module.exports.createUser = function(newUser, callback) {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            newUser.password = hash;
            newUser.save(callback);
        });
    });
};

module.exports.getUserByUsername = function(username, callback) {
    var query = {username : username};
    User.findOne(query, callback);
};

module.exports.comparePassword = function(candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
        if (err) throw err;
        callback(null, isMatch);
    });
};

module.exports.getUserById = function(id, callback) {
    User.findById(id, callback);
}