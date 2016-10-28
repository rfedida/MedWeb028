var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var routes = require('./routes/index');
var agamRoutes = require('./routes/agam');  
var medRoutes = require('./routes/med');
var infrastructureRoutes = require('./routes/infrastructure');
var mongoose = require('mongoose');
var cookieParser = require("cookie-parser");
var session = require("express-session");

var app = express();

app.use(session({secret : "keyboard cat",
                 resave : true,
                 saveUninitialized : true,
                 cookie : {}}));

app.use(cookieParser());
//app.use(express.session({secret : "123"}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


app.use(function(req, res, next)
{
    var url = req.originalUrl;
    if (url === "/" ||
        url.startsWith("/agam/views") ||
        url.startsWith("/agam/javascripts")||
        url.startsWith("/common/views") ||
        url.startsWith("/common/javascripts")||
        url.startsWith("/components") ||
        url.startsWith("/infrastructure/views") ||
        url.startsWith("/infrastructure/javascripts")||
        url.startsWith("/med/views") ||
        url.startsWith("/med/javascripts")||
        url.startsWith("/infrastructure/login"))
    {
        next();
    }
    else
    {
        var loginDetails = {};
        var isLoggedOn = req.cookies.hash != null && req.session[req.cookies.hash] != null;
        console.log("req address : " + req.originalUrl);
        console.log("check if user logged on");

        if (isLoggedOn)
        {
            next();
        }
        else
        {
            res.status(401).send();
        }
    }
});

app.use(express.static(__dirname + '\\public'));

app.use('/', routes);
app.use('/agam', agamRoutes);
app.use('/med', medRoutes);
app.use('/infrastructure', infrastructureRoutes);


// Listening to port 9000
var port = process.env.PORT || 9000;
app.listen(port, function() {
    console.log('Listening on ' + port);
});

// Connect to mongoDB
mongoose.connect('mongodb://150.0.0.56:27017/DB');

// Getting the data from the db
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
    console.log("connect to mongo");
});

module.exports = app;

