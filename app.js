// Server
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var routes = require('./routes/index');
var agamRoutes = require('./routes/agam'); 
var medRoutes = require('./routes/med');
var infrastructureRoutes = require('./routes/infrastructure');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var crud = require('./routes/crud');
var dgram = require('dgram');
var Buffer = require('buffer').Buffer;
var udpServer = dgram.createSocket('udp4');
var pjson = require('./package.json');
var bodyParser = require("body-parser");
var temp = require('./server/med/temp');
var mongo = require('./server/med/mongo');
var cookieParser = require("cookie-parser");
var session = require("express-session");
var auth = require("./server/infrastructure/BL/authentication")

var server = express();

server.use(session({secret : "keyboard cat",
                 resave : true,
                 saveUninitialized : true,
                 cookie : {}}));

server.use(cookieParser());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended:true}));

server.use(function(req, res, next)
{
    var url = req.originalUrl;
    if (url === "/" ||
        // url === "/med/" ||
        // url === "/agam" ||
        // url.startsWith("/agam/views") ||
        // url.startsWith("/agam/javascripts")||
        url.startsWith("/common/views") ||
        url.startsWith("/common/javascripts")||
        url.startsWith("/common/img")||
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

server.use(express.static(__dirname + '/public'));
server.use('/', routes);
server.use('/med', medRoutes);
server.use('/agam', agamRoutes);
server.use('/infrastructure', infrastructureRoutes);

server.use('/crud', crud);


// Listening to port 9000
var port = process.env.PORT || 9000;
server.listen(port, function() {
    console.log('Listening on ' + port);
});

// MongoDB part
var isOnline = false;

function connectToMongo () {
    mongoose.connect('mongodb://150.0.0.56:27017/DB');
    // Getting the data from the db
    var db = mongoose.connection;
    db.on('error', function(err) {
        isOnline = false;
        console.log('Connection to mongo failed');
    });
    db.once('open', function(){
        isOnline = true;
        console.log("connect to mongo");
        
        // Update db according files
        if (!pjson.isWeb) {
            var tempUnits, tempPatients;
            temp.getTempPatients(function(data) {
                tempPatients = data;
            });
            temp.getTempUnits(function(data) {
                tempUnits = data;
            });
        }
    });
    db.on('close', function(){
        console.log("connection to mongo closed");
        isOnline = false;
    });
}

// Connect to mongoDB
if (pjson.isWeb) {
    connectToMongo();
} else {
    setInterval(function() {
        if (mongoose.connection.readyState != 1) {
            connectToMongo();
        }
    }, 3000);
}
// UDP Server
var patient = undefined;

udpServer.on('error', (err) => {
    console.log('UDP server error' + err);
});

udpServer.on('message', (msg, rinfo) => {
    patient = JSON.parse(msg.toString("utf8"));
    console.log(patient);
    sendToBracelet(patient);
});

udpServer.on('listening', () => {
    console.log("UDP server is listening");
});

udpServer.bind(9001);

function sendToBracelet(data) {
    var toSend = JSON.stringify(data);
    var buf = new Buffer(toSend.length);
    buf.write(toSend);
    udpServer.send(buf, 0, buf.length, 9002, '150.0.0.123', (err)=> {
        if(err) {
            console.log(err);
        }
    });
}

var exports = {
    server: server,
    udpServer: udpServer,
    patient: patient,
    sendToBracelet: sendToBracelet,
    isOnline: isOnline
};

module.exports = exports;