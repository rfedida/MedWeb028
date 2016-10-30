var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var routes = require('./routes/index');
var agamRoutes = require('./routes/agam');  
var medRoutes = require('./routes/med');
var infrastructureRoutes = require('./routes/infrastructure');
var mongoose = require('mongoose');
var crud = require('./routes/crud');
var dgram = require('dgram');
var Buffer = require('buffer').Buffer;
var udpServer = dgram.createSocket('udp4');
var cookieParser = require("cookie-parser");
var session = require("express-session");
var auth = require("./server/infrastructure/BL/authentication")

var app = express();

app.use(session({secret : "keyboard cat",
                 resave : true,
                 saveUninitialized : true,
                 cookie : {}}));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


app.use(function(req, res, next)
{
    var url = req.originalUrl;
    if (url === "/" ||
        // url === "/med/" ||
        // url === "/agam" ||
        // url.startsWith("/agam/views") ||
        // url.startsWith("/agam/javascripts")||
        url.startsWith("/common/views") ||
        url.startsWith("/common/javascripts")||
        url.startsWith("/components") ||
        url.startsWith("/infrastructure/views") ||
        url.startsWith("/infrastructure/javascripts")||
        // url.startsWith("/med/views") ||
        // url.startsWith("/med/css") ||
        // url.startsWith("/med/javascripts")||
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
            var currentUser = auth.getUser(req);

            // Only agam
            // if (currentUser.PermissionID.split("_").length < 4 && 
            //     url.startsWith("/med"))
            // {
            //     res.writeHead(307, {Location : "/agam"});
            //     res.end();
            // }
            // only med
            if (currentUser.PermissionID.split("_").length == 4 && 
                     url.startsWith("/agam"))
            {
                res.writeHead(307, {Location : "/med"});
                res.end();
            }
            else
            {                
                next();
            }
        }
        else
        {
            res.writeHead(307, {Location : "/"});
            res.end();
        }
    }
});

app.use(express.static(__dirname + '/public'));
app.use('/', routes);
app.use('/agam', agamRoutes);
app.use('/med', medRoutes);
app.use('/infrastructure', infrastructureRoutes);
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
    console.log("connected to mongo");
});

// UDP Server
udpServer.on('error', (err) => {
    console.log('UDP server error' + err);
});

udpServer.on('message', (msg, rinfo) => {
    console.log(msg);
    var buf = new Buffer(4);
    buf.write("Nave");
    udpServer.send(buf, 0, buf.length, rinfo.port, rinfo.address, (err)=> {
        if(err) {
            console.log(err);
        }
    });
});

udpServer.on('listening', () => {
    console.log("UDP server is listening");
});

udpServer.bind(9001);

module.exports = app;