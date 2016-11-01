var express = require('express');
var router = express.Router();
var path = require('path');
var auth = require("../server/infrastructure/BL/authentication");
var helpers = require('./helpers');
//var nodeSession = require("node-session");

/* GET home page of med. */
router.post('/login', function(req, res, next) 
{

        if(!helpers.isOnline){
            var userDetails = {
                username : "med",
                permission : "1_1_1_1",
                hash : "pmWkWSBCL51Bfkhn79xPuKBKHz//H6B+mY6G9/eieuM=",
                userId : "000003"
            }
            res.send(userDetails);
            return;
        }

    auth.login(req.body.username.toString(), req.body.password.toString(), req)
    .then(function(user)
    {
        var seesionObject = {};
        helpers.stationID = user.PermissionID;
        seesionObject[user.hash] = user;
        req.session[user.hash] = user;
        var userDetails = {
            username : user.UserName,
            permission : user.PermissionID,
            hash : user.hash,
            userId : user.UserId
        }
        res.send(userDetails);
    })
    .catch(function(error)
    {
        res.status(500).send();
    });

});

module.exports = router;
