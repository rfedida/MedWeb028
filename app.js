var express = require('express');
var path = require('path');
var routes = require('./routes/index');
var agamRoutes = require('./routes/agam');  
var medRoutes = require('./routes/med');
var mongoose = require('mongoose');


var app = express();

// app.use(express.cookieParser());
// app.use(express.session({secret : "123"}));


app.use(function(req, res, next)
{
    var loginDetails = {};
    var isLoggedOn = true;
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
});

app.use(express.static(__dirname + '\\public'));

app.use('/', routes);
app.use('/agam', agamRoutes);
app.use('/med', medRoutes);

// Connect to mongoDB
//mongoose.connect('mongodb://150.0.0.228:27017/medicineDB');

module.exports = app;



// Listening to port 9000
var port = process.env.PORT || 9000;
app.listen(port, function() {
    console.log('Listening on ' + port);
});

