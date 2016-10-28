var express = require('express');
var router = express.Router();
var path = require('path');
var auth = require("../server/infrastructure/BL/authentication");
//var nodeSession = require("node-session");

/* GET home page of med. */
router.post('/login', function(req, res, next) 
{
    auth.login(req.body.username.toString(), req.body.password.toString(), req)
    .then(function(user)
    {
        var seesionObject = {};
        seesionObject[user.hash] = user;
        req.session[user.hash] = user;
        res.send(user.hash);
    })
    .catch(function(error)
    {
        res.status(500).send();
    });

});

module.exports = router;
