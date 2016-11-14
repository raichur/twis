var Twit = require('twit');
var fs = require('fs');
var ejs = require('ejs');

var config = require('./../cred');

var T = new Twit(config);

module.exports = function(req, res){
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
}
