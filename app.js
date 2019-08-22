const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const passportLocalMongoose = require('passport-local-mongoose');
const bodyParser = require('body-parser');
const Applicant = require('./models/applicants');
const Admin = require('./models/admin');
const sendAppliedEmail = require('./mail/index.js');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const methodOverride = require('method-override');

const app = express();
app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + '/js'));

app.use(methodOverride('_method'));

const port = process.env.PORT || 3000;


const uri = "mongodb+srv://klaurtar:Helloryan1@cluster0-nakj7.mongodb.net/test?retryWrites=true";


mongoose.connect(uri, {useNewUrlParser: true});
const db = mongoose.connection;
app.use(bodyParser.urlencoded({extended: true}));

app.use(cookieParser('secret'));
app.use(session({
    secret: 'troSno',
    resave: false,
    saveUninitialized: false
  }));

app.use(flash());
app.use((req, res, next) => {
    res.locals.message = req.flash('success');
    next();
  });

//Passport Setup
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(Admin.authenticate()));
passport.serializeUser(Admin.serializeUser());
passport.deserializeUser(Admin.deserializeUser());


app.get('/', function(req, res){
    res.render('index');
});

app.get('/employment', function(req, res){
    res.render('employment');
});

app.post('/employment', function(req, res){
    // const firstName = req.body.firstName;
    // const middleInitial = req.body.middleInitial;
    // const lastName = req.body.lastName;
    // const address = req.body.address;
    // const city = req.body.city;
    // const state = req.body.state;
    // const zipCode = req.body.zipCode;
    // const phoneNumber = req.body.phoneNumber;
    // const doYouRecieveText = req.body.doYouRecieveText;
    
    const newApplicant = req.body;
    // const newApplicant = {
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
            req.flash('success', 'Your application was succesfully submitted! Thank you!');
            res.redirect('/');
            
        }
    });
});


app.get("/dashboard", isLoggedIn, function(req, res) {
    res.render("dashboard");
});

app.get("/admin", isLoggedIn, function(req, res){
    Applicant.find({}, function(err, applicants){
      if(err){
        console.log(err);
      } else {
        res.render("admin", {applicants: applicants});
      }
    });
  });

//SHOW APPLICANT ROUTE
app.get("/admin/:id", isLoggedIn, function(req, res){
    Applicant.findOne({_id: req.params.id}, function(err, foundApplicant) {
        if(err) {
            res.redirect('/admin');
        } else {
            res.render("show", {applicant: foundApplicant});
        }
    })
  });

//DELETE BLOG ROUTE
app.delete("/admin/:id", isLoggedIn, function(req, res){
    //DESTROY Applicant
    Applicant.findOneAndRemove({_id: req.params.id}, function(err){
        if(err){
            res.redirect("/admin");
        } else {
            res.redirect("/admin");
        }
    })
  });

  //AUTH ROUTES
app.get("/register", isLoggedIn, function(req, res) {
    res.render("register");
});

app.post("/register", isLoggedIn, function(req, res) {
    var newAdmin = new Admin({username: req.body.username});
    Admin.register(newAdmin, req.body.password, function(err, admin) {
        if(err) {
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function() {
            res.redirect("/dashboard");
        });
    });
});

app.get("/viewadmins", isLoggedIn, function(req, res) {
    Admin.find({}, function(err, admins){
      if(err){
        console.log(err);
      } else {
        res.render("viewadmins", {admins: admins});
      }
    });
});

app.delete("/viewadmins/:id", isLoggedIn, function(req, res){
    //DESTROY Applicant
    Admin.findOneAndRemove({_id: req.params.id}, function(err){
        if(err){
            res.redirect("/viewadmins");
        } else {
            res.redirect("/viewadmins");
        }
    })
  });

app.get("/login", function(req, res) {
    res.render('login');
});

app.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/dashboard",
        failureRedirect: "/login"
    }), function(req, res) {
    
});

//Middleware
function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    } else {
        res.redirect("/login");
    }
}

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });