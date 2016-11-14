var express = require('express');
var http = require('http');
var fs = require('fs');
var ejs = require('ejs');
var Twit = require('twit');
var config = require('./cred');
var path = require('path');
var T = new Twit(config);

var app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  fs.readFile('index.html', 'utf-8', function(err, content) {
    if (err) {
      res.end('Error: ' + err);
      return;
    }
    var twitter_data = [];
    twitter_data.username = "Twitter Data Visualizer";
    twitter_data.list = "Search for a user";
    var html = ejs.render(content, {twitter_data: twitter_data});
    res.end(html);
  });
});

app.get('/:user', function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  fs.readFile('index.html', 'utf-8', function(err, content) {
    if (err) {
      res.end('Error: ' + err);
      return;
    }
    var twitter_data = [];
    twitter_data.username = "Person Not Found";
    T.get('followers/ids', { screen_name: req.params.user },  function (err, data, response) {
      var users = "<ul>";
      for(var person in data.ids) {
        users += "<li>" + data.ids[person] + "</li>";
      }
      users += "</ul>";
      twitter_data.username = req.params.user;
      twitter_data.list = users;
      var html = ejs.render(content, {twitter_data: twitter_data});
      res.end(html);
    });
  });
});

app.listen(app.get('port'), function() {
  console.log('Express started');
});
