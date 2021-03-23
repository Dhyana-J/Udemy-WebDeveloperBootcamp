
const express = require('express');
const date = require(__dirname+'/date.js'); // 이런식으로 local에 분리해놓은 코드를 include해서 쓸 수 있음

const app = express();

const todoItems = [];
const workItems = [];

app.set('view engine','ejs');
app.use(express.urlencoded({extended:true})); //bodyParser
app.use(express.static('public'));

app.get('/',(req,res)=>{
    const day = date.getDay();
    res.render('list',{listTitle:day,todoItems:todoItems});
});


app.post('/AddList',(req,res)=>{
    const newItem = req.body.newItem;

    if(req.body.list==='Work'){
        if(newItem) workItems.push(newItem);
        res.redirect('/Work');
    }else{
        if(newItem) todoItems.push(newItem);
        res.redirect('/');
    }
});


app.get('/Work',(req,res)=>{
    res.render('list',{listTitle:'Work List',todoItems:workItems})
})

app.post('/Work',(req,res)=>{
    const item = req.body.newItem;
    workItems.push(item);
    res.redirect('/work');
})

app.get('/about',(req,res)=>{
    res.render("about");
})

app.listen(3000,()=>{
    console.log('Server started on port 3000');
});

