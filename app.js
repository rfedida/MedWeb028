var express = require('express');
var path = require('path');
var routes = require('./routes/index');
var agamRoutes = require('./routes/agam');  
var medRoutes = require('./routes/med');
var infrastructureRoutes = require('./routes/infrastructure');
var mongoose = require('mongoose');
var crud = require('./routes/crud');
var app = express();
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
app.use('/api/agam', agamRoutes);
app.use('/api/med', medRoutes);
app.use('/api/infrastructure', infrastructureRoutes);
app.use('/crud', crud);
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