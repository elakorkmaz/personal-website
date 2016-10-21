var express = require('express');
var pug = require('pug');
var fs = require ('fs');

var app = express();

// lets us access files inside the public folder via http:
app.use(express.static(__dirname + '/'));

app.get('/', function(request, response) {
  response.redirect('/index.pug');
});

app.listen(3001, function() {
  console.log('Web server is now running on port 3001');
});
