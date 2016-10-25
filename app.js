var express = require('express');
var path = require('path');
var app = express();
var routes = require('./routes/index');
var songs = require('./routes/songs');



// view setup
app.set('views', __dirname + '/views');

// Setting up the mongoDB
 var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/test');


// uncomment after placing your favicon in /public
app.use(express.static(__dirname + 'public'));

app.use('/', routes);
app.use('/songs', songs);

// Getting the data from the db
var db = mongoose.connection;
var AllSongs;
 db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
    var MusicSchema = new mongoose.Schema({
        songName : String,
        singer: String
    }, {collection:'Songs'});

    mongoose.model('Song', MusicSchema);
    var Song = db.model('Song');
    Song.find({},function(err, Songs) {
        AllSongs = Songs;        
    });
});

// catch 404 and forward to error handler
/*app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
}); */

// error handlers

// development error handler
// will print stacktrace
/*if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send({message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send({message: err.message,
    error: {}
  });
}); */


module.exports = app;
