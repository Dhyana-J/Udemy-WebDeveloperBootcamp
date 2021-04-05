
require('dotenv').config(); // env파일에 민감정보를 기록해두고 불러와 쓸 수 있음
const express= require("express");
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const findOrCreate = require('mongoose-findorcreate');
// const encrypt = require('mongoose-encryption');
// const md5 = require('md5');
// const bcrypt = require('bcrypt');
// const saltRounds = 10;



const app = express();

app.set('view engine','ejs');

app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

app.use(session({
    secret:'Our little secret.',
    resave:false,
    saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect('mongodb://localhost:27017/userDB',{ useNewUrlParser: true, useUnifiedTopology: true  });
mongoose.set('useCreateIndex',true);

const userSchema = new mongoose.Schema({
    email:String,
    password : String,
    secret:String,
    googleId: String,
    facebookId:String
});

// userSchema.plugin(encrypt,{secret:process.env.SECRET,encryptedFields:['password']});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = new mongoose.model('User',userSchema);

passport.use(User.createStrategy());

// passport.serializeUser(User.serializeUser()); //for local authentication
// passport.deserializeUser(User.deserializeUser()); //for local authentication


passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
passport.deserializeUser(function(id, done) {
User.findById(id, function(err, user) {
    done(err, user);
});
});


passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/auth/google/secrets',
    userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo'
  },
  function(accessToken, refreshToken, profile, cb) {
      console.log(profile);
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:3000/auth/facebook/secrets"
  },
  function(accessToken, refreshToken, profile, cb) {
      console.log(profile);
    User.findOrCreate({ facebookId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));



app.get('/',(req,res)=>{
    if(req.isAuthenticated()){
        res.redirect('secrets');
    }else{
        res.render('home');
    }
});

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] })
);

app.get('/auth/google/secrets', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/secrets');
  });

app.get('/auth/facebook',
passport.authenticate('facebook'));

app.get('/auth/facebook/secrets',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/secrets');
  });


app.get('/login',(req,res)=>{
        res.render('login');
});

app.get('/register',(req,res)=>{
        res.render('register');
});

app.get('/secrets',(req,res)=>{
    User.find({'secret':{$ne:null}},(err,foundUsers)=>{
        if(err) console.log(err);
        else{
            if(foundUsers){
                res.render('secrets',{usersWithSecrets:foundUsers});
            }
        }
    });
});

app.get('/submit',(req,res)=>{
    if(req.isAuthenticated()){
        res.render('submit');
    }else{
        res.redirect('/login');
    }
});

app.post('/submit',(req,res)=>{
    const secret = req.body.secret;
    console.log(req.user);

    User.findById(req.user.id,(err,foundUser)=>{
        if(err) console.log(err);
        else{
            if(foundUser){
                foundUser.secret=secret;
                foundUser.save(()=>{
                    res.redirect('/secrets');
                });
            }
        }
    });
});

app.get('/logout',(req,res)=>{
    req.logout();
    res.redirect('/');
});

app.post('/register',(req,res)=>{
    User.register({username:req.body.username},req.body.password,(err,user)=>{
        if(err){
            console.log(err);
            res.redirect('/register');
        }else{
            passport.authenticate('local')(req,res,()=>{
                res.redirect('/secrets');
            });
        }
    });

});

app.post('/login',(req,res)=>{
    const user = new User({
        username:req.body.username,
        password:req.body.password
    });

    req.login(user,(err)=>{//passport method
        if(err){
            console.log(err);
        }else{
            passport.authenticate('local')(req,res,()=>{
                res.redirect('/secrets');
            });
        }
    });

});



app.listen(3000,()=>{
    console.log('server started on localhost 3000');
});