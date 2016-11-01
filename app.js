// Server
var express = require('express');
var path = require('path');
var routes = require('./routes/index');
var agamRoutes = require('./routes/agam'); 
var medRoutes = require('./routes/med');
var infrastructureRoutes = require('./routes/infrastructure');
var mongoose = require('mongoose');
var dgram = require('dgram');
var Buffer = require('buffer').Buffer;
var udpServer = dgram.createSocket('udp4');
var pjson = require('./package.json');
var bodyParser = require("body-parser");
var temp = require('./server/med/temp');
var mongo = require('./server/med/mongo');
var files = require('./server/med/files');
var cookieParser = require("cookie-parser");
var session = require("express-session");
var auth = require("./server/infrastructure/BL/authentication")
var crud = require('./routes/crud');
var helpers = require('./routes/helpers');
var ping = require('ping');

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
            if (req.cookies.user)
            {
                var user = JSON.parse(req.cookies.user);
                
                var userToSession = { 
                    "UserId" : user.userId, 
                    "UserName" : user.username, 
                    "Password" : user.hash,
                    "hash" : user.hash,
                    "PermissionID" : user.permission
                };

                req.session[req.cookies.hash] = userToSession;
                next();
            }
            else
            {
                res.writeHead(307, {Location : "/"});
                res.end();
            }
        }
    }
});

server.use(express.static(__dirname + '/public'));
server.use('/', routes);
server.use('/med', medRoutes);
server.use('/agam', agamRoutes);
server.use('/infrastructure', infrastructureRoutes);

server.use('/crud', crud);
//server.use('/crud', pollinghelper);

// Listening to port 9000
var port = process.env.PORT || 9000;
server.listen(port, function() {
    console.log('Listening on ' + port);
});

// MongoDB part
helpers.isOnline = false;

function connectToMongo () {
    mongoose.connect('mongodb://150.0.0.56:27017/DB');
    // Getting the data from the db
    var db = mongoose.connection;
    db.on('error', function(err) {
        helpers.isOnline = false;
        mongoose.connection.close();
        console.log('Connection to mongo failed');
    });
    db.once('open', function(){
        helpers.isOnline = true;
        console.log("connect to mongo");
        
        // Update db according files
        if (!pjson.isWeb) {
            temp.getTempPatients(function(data) {
                for (var i=0; i<data.length; i++) {
                    mongo.updatePatientAfterConnection(data[i]);
                }
            });
            temp.getTempUnits(function(data) {
                for (var i=0; i<data.length; i++) {
                    mongo.updateUnitAfterConnection(data[i]);
                }
            });
            mongo.getAllUnits(function(data) {
                for (var i=0; i<data.length; i++) {
                    files.updateUnit(data[i], function(data) {
                        // Decide to check if there was update
                    });
                }
            });
        }
    });
    db.on('close', function(){
        console.log("connection to mongo closed");
        helpers.isOnline = false;
    });
}

// Connect to mongoDB
if (pjson.isWeb) {
    connectToMongo();
} else {
    setInterval(function() {
        if (!helpers.isOnline) {
            ping.sys.probe('150.0.0.56', function(isAlive) {
                if (isAlive) {
                    console.log("PING GOOD!!!");
                    connectToMongo();
                } else {
                    console.log("No network");
                }
            });
        }
    }, 3000);
}

if (!pjson.isWeb) {
    // UDP Server
    helpers.udpServer = udpServer;

    udpServer.on('error', (err) => {
        console.log('UDP server error' + err);
    });

    udpServer.on('message', (msg, rinfo) => {
        helpers.agentInfo = rinfo;
        patient = JSON.parse(msg.toString("utf8"));
        patient.CurrentStation = helpers.stationID;
        patient.Stations.push({"stationId": helpers.stationID, 
                               "receptionTime": new Date().getDate(),
                               "leavingDate": null});
        helpers.patient = patient;

        // write to file
        files.writePatientOrUpdateFromUsb(patient);

        // write to db
        if (helpers.isOnline) {
            mongo.writePatientOrUpdateFromUsb(patient);
        } else {
            // write to temp file
            temp.writePatientOrUpdateFromUsb(patient);
        }
        console.log(patient);
        helpers.sendToBracelet(patient);
    });

    udpServer.on('listening', () => {
        console.log("UDP server is listening");
    });

    udpServer.bind(9001);

    helpers.sendToBracelet = (data) => {
        var toSend = JSON.stringify(data);
        var buf = new Buffer(toSend.length);
        buf.write(toSend);
        udpServer.send(buf, 0, buf.length, helpers.agentInfo.port, helpers.agentInfo.ip, (err)=> {
            if(err) {
                console.log(err);
            }
        });
    }
}

helpers.server = server;

module.exports = server;