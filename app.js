var express = require('express');

var app = express();
app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + '/js'));
var port = 3000;

app.get('/', function(req, res){
    res.render('index');
});

app.get('/employment', function(req, res){
    res.render('employment');
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });