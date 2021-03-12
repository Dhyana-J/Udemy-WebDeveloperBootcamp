
const express = require('express');
const app = express();

app.get("/", (req,res)=>{
    res.send('<h1>hello world!</h1>');
});

app.get("/contact", (req,res)=>{
    res.send('Contact me!');
});

app.get("/about", (req,res)=>{
    res.send('Who am I ?');
});

app.get("/hobbies", (req,res)=>{
    res.send('<ul><li>reading</li><li>singing</li><li>coding</li></ul>');
});

app.listen(3000,()=>{
    console.log('Server started on port 3000');
});

