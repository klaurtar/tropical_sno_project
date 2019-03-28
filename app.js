var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var Applicant = require('./models/applicants');
var sendAppliedEmail = require('./mail/index.js');

var app = express();
app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + '/js'));
var port = process.env.PORT || 3000;




var uri = "mongodb+srv://klaurtar:Helloryan1@cluster0-nakj7.mongodb.net/test?retryWrites=true";
var client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  var collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

// mongoose.connect('mongodb+srv://klaurtar:Helloryan1@cluster0-nakj7.mongodb.net/test?retryWrites=true', {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
// Applicant.create({
    // firstName: 'Ryan',
    // middleInitial: 'L',
    // lastName: 'Talbert',
    // address: '710 La Marite Dr.',
    // city: 'Manchester',
    // state: 'Missouri',
    // zipCode: '63021',
    // phoneNumber: '6364842273',
    // text: false
//     });

app.get('/', function(req, res){
    res.render('index');
});

app.get('/employment', function(req, res){
    res.render('employment');
});

app.post('/employment', function(req, res){
    // var firstName = req.body.firstName;
    // var middleInitial = req.body.middleInitial;
    // var lastName = req.body.lastName;
    // var address = req.body.address;
    // var city = req.body.city;
    // var state = req.body.state;
    // var zipCode = req.body.zipCode;
    // var phoneNumber = req.body.phoneNumber;
    // var doYouRecieveText = req.body.doYouRecieveText;
    
    var newApplicant = req.body;
    // var newApplicant = {
    //     firstName: firstName,
    //     middleInitial: middleInitial,
    //     lastName: lastName,
    //     address: address,
    //     city: city,
    //     state: state,
    //     zipCode: zipCode,
    //     phoneNumber: phoneNumber,
    //     doYouRecieveText: doYouRecieveText
    // };
    
    Applicant.create(newApplicant, function(err, newlyCreated){
        if(err) {
            console.log(err);
        } else {
            console.log(newlyCreated);
            sendAppliedEmail(newApplicant);
            res.redirect('/');
        }
    });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });