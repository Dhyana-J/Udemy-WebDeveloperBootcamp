
require('dotenv').config(); // env파일에 민감정보를 기록해두고 불러와 쓸 수 있음
const express= require("express");
const mongoose = require('mongoose');
// const encrypt = require('mongoose-encryption');
// const md5 = require('md5');
// const bcrypt = require('bcrypt');
// const saltRounds = 10;



const app = express();

app.set('view engine','ejs');

app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

mongoose.connect('mongodb://localhost:27017/userDB',{ useNewUrlParser: true, useUnifiedTopology: true  });

const userSchema = new mongoose.Schema({
    email:String,
    password : String
});

// userSchema.plugin(encrypt,{secret:process.env.SECRET,encryptedFields:['password']});


const User = new mongoose.model('User',userSchema);


app.get('/',(req,res)=>{
        res.render('home');
});

app.get('/login',(req,res)=>{
        res.render('login');
});

app.get('/register',(req,res)=>{
        res.render('register');
});


app.post('/register',(req,res)=>{
    // bcrypt.hash(req.body.password, saltRounds, (err, hash)=> {
    //     const newUser = new User({
    //         email:req.body.username,
    //         // password:md5(req.body.password)
    //         password:hash
    //     });
    
    //     newUser.save((err)=>{
    //         if(err) console.log(err);
    //         else{
    //             res.render('secrets');
    //         }
    //     });
    // });

});

app.post('/login',(req,res)=>{
    // const username = req.body.username;
    // const password = req.body.password;

    // User.findOne({email:username},(err,foundUser)=>{
    //     if(err) console.log(err);
    //     else{
    //         if(foundUser){
    //             // if(foundUser.password===password) res.render('secrets');
    //             bcrypt.compare(password,foundUser.password,(err,result)=>{
    //                 if(result) res.render('secrets');
    //             });
    //         }
    //     }
    // });
});



app.listen(3000,()=>{
    console.log('server started on localhost 3000');
});