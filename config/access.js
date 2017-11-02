module.exports.ensureAccess = function (){
    return function (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        else {
            return res.status(400).send('Access Denied');
        }
    };
};