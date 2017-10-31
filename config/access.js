var AccessControl = require('accesscontrol');

var grants = {
    admin: {
        user: {
            "read:any": ["*"],
            "delete:any": ["*"],
            "update:any": ["*"]
        }
    },
    everyone: {
        user: {
            "read:any": ['*', '!password'],
            "delete:own": ['*'],
            "update:own": ['*']
        }
    }
};



// Access Control
module.exports.ensureAccess = function (action, resource){
    return function (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        else {
            return res.status(400).send('Access Denied');
        }
    };
};