var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');

app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Root path will read from public directory
app.use('/', express.static(path.join(__dirname, 'public')));

// Read favorites from data.json and return it for GET /favorites
app.get('/favorites', function(req, res){
  var data = fs.readFileSync('./data.json');
  res.setHeader('Content-Type', 'application/json');
  res.send(data);
});

// Update favorites in data.json for POST /favorites
app.post('/favorites', function(req, res){
  console.log("favorites", req.body);
  if(!req.body.Title || !req.body.imdbID){
    res.status(500).send('No name or id');
    return;
  }
  var data = JSON.parse(fs.readFileSync('./data.json'));
  data.push(req.body);
  fs.writeFile('./data.json', JSON.stringify(data));
  res.setHeader('Content-Type', 'application/json');
  res.send(data);
});

app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});
