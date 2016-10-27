var express = require('express');
var router = express.Router();
var path = require('path');
var auth = require("server/infrastructure/authentication");


/* GET home page of med. */
router.get('/login', function(req, res, next) 
{
    auth.login(req.username, req.password)
    .then(function(user)
    {
        res.ok(user.token);
      // save token on session
    })
    .catch(function(error)
    {
        res.status(500).send();
    });

});

module.exports = router;
