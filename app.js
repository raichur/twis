var express = require('express');
var index = require('./routes/index');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', index);

app.get('/:user', user);

app.listen(app.get('port'), function() {
  console.log('Express started');
});
