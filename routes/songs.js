var express = require('express');
var router = express.Router();
//var app = require('app');

/* GET users listing. */
router.get("/Songs", function(req, res){
    res.json(AllSongs);    
});

module.exports = router;
