var fs = require('fs');
var ejs = require('ejs');

module.exports = function(req, res){
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
}
