var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var mongoose = require('mongoose');
var MongoStore = require('connect-mongo')(session);

var uristring =
    process.env.MONGOLAB_URI ||
    process.env.MONGOHQ_URL ||
    process.env.MONGODB_URI ||
    'mongodb://localhost/codecoin';

// Makes connection asynchronously.  Mongoose will queue up database
// operations and release them when the connection is complete.
mongoose.Promise = global.Promise;
mongoose.connect(uristring, { useMongoClient: true }, function (err, res) {
    if (err) {
        console.log ('ERROR connecting to: ' + uristring + '. ' + err);
    } else {
        console.log ('Succeeded connected to: ' + uristring);
    }
});

var app = express();


// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


// Express Session
app.use(session({
    secret: 'UTXwa9iGRy',
    saveUninitialized: true,
    resave: true,
    store: new MongoStore({mongooseConnection : mongoose.connection})
}));

var passportConfig = require('./config/passport')(app, passport);


app.get('/', function(req, res) {
    return res.send("ok");
});

var user = require('./routes/user');
app.use('/user', user);


// The http server will listen to an appropriate port, or default to
// port 5000.
var thePort = process.env.PORT || 5000;

// Set Port
app.set('port', thePort);

app.listen(app.get('port'), function(){
    console.log('Server started on port '+app.get('port'));
});