var Twit = require('twit');
var fs = require('fs');
var ejs = require('ejs');

var config = require('./../cred');

var T = new Twit(config);

module.exports = function(req, res){
  res.writeHead(200, {'Content-Type': 'text/html'});
  fs.readFile('./index.html', 'utf-8', function(err, content) {
    if (err) {
      res.end('Error: ' + err);
      return;
    }
    // var twitter_data = [];
    // twitter_data.username = "Person Not Found";
    // T.get('friends/list', { screen_name: req.params.user, count: 200 },  function (err, data, response) {
    //   console.log(data);
    //   var users = '{"nodes": [';
    //   for(var person in data.users) {
    //     console.log(data.users[person]);
    //     users += '{"name":"' + data.users[person].screen_name + '", "color": "#' + data.users[person].profile_background_color + '", "group":1}';
    //     if(person < data.users.length-1) {
    //       users += ",";
    //     } else {
    //       users += "],";
    //     }
    //   }
    //   users += '"links":[{"source":2,"target":1,"weight":1},{"source":0,"target":2,"weight":3}]}';
    //   twitter_data.username = req.params.user;
    //   twitter_data.list = users;
      // var html = ejs.render(content, {twitter_data: twitter_data});
      var html = ejs.render(content);
      res.end(html);
    // });
  });
}
