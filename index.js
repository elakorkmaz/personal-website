var express = require('express');
var pug = require('pug');
var app = express();

// tells the server that you can request static files from /public folder:
app.use(express.static(__dirname + '/'));

app.get('/', function(request, res) {
  res.send(pug.renderFile(__dirname + '/index.pug', {}));
});

app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
});
