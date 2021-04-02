const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.set('view engine','ejs');

app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

mongoose.connect('mongodb://localhost:27017/wikiDB',{useUnifiedTopology: true,useNewUrlParser:true});

const articlesSchema = new mongoose.Schema({
    title:String,
    content:String
});

const Article = mongoose.model('Article',articlesSchema);


/*--------- Requests Targetting Articles ----------*/ 

// // GET : Fetches ALL the articles
// app.get('/articles',(req,res)=>{
//     Article.find({},(err,articles)=>{
//         if(err) console.log(err);
//         else{
//             res.send(articles);
//         }
//     });
// });

// //POST : Creates one new article
// app.post('/articles',(req,res)=>{
//     console.log(req.body.title);
//     console.log(req.body.content);

//     const newArticle = new Article({
//         title: req.body.title,
//         content: req.body.content
//     });

//     newArticle.save((err)=>{
//         if(err) console.log(err);
//         else{
//             res.send('Successfully added a new article!');
//         }
//     });
// });

// //DELETE : Deletes all the articles
// app.delete('/articles',(req,res)=>{
//     Article.deleteMany((err)=>{
//         if(err) console.log(err);
//         else{
//             res.send('Successfully deleted all articles');
//         }
//     });
// });


//Chained Route Handler Using Express
app.route('/articles')
    .get((req,res)=>{
        Article.find({},(err,articles)=>{
            if(err) console.log(err);
            else{
                res.send(articles);
            }
        });
    })
    .post((req,res)=>{
        console.log(req.body.title);
        console.log(req.body.content);
    
        const newArticle = new Article({
            title: req.body.title,
            content: req.body.content
        });
    
        newArticle.save((err)=>{
            if(err) console.log(err);
            else{
                res.send('Successfully added a new article!');
            }
        });
    })
    .delete((req,res)=>{
        Article.deleteMany((err)=>{
            if(err) console.log(err);
            else{
                res.send('Successfully deleted all articles');
            }
        });
    });


/*--------- Requests Targetting A Specific Article ----------*/ 

app.route('/articles/:title')
    .get((req,res)=>{ // Fetches the article on a specific route
        Article.findOne({title:req.params.title},(err,foundArticle)=>{
            if(err) res.send(err);
            else{
                if(foundArticle) res.send(foundArticle);
                else res.send('No articles matching that title was found.');
            }
        });
    })
    .put((req,res)=>{ // Updates the article on a specific route
        Article.update(
            {title:req.params.title},
            {
                title:req.body.title,
                content:req.body.content
            },
            {overwrite:true},//true면 객체를 넘어오는 key-value 들로만 구성한다. false면 기존 key 유지. value는 갈아엎음
            (err)=>{
                if(err) res.send(err);
                else{
                    res.send('Successfully updated article');
                }
            }
        );
    })
    .patch((req,res)=>{ 
        Article.update(
            {title:req.params.title},
            {
                $set: req.body
            },
            (err)=>{
                if(err) res.send(err);
                else{
                    res.send('Successfully updated article');
                }
            }
        );
    })
    .delete((req,res)=>{
        Article.deleteOne({title:req.params.title},(err,result)=>{
            if(err) res.send(err);
            else{
                console.log(result);
                if(result.n>0) res.send('Successfully deleted all articles');
                else res.send('No matched title found');
            }
        });
    });
    


app.listen(3000,()=>{
    console.log('Server started on port 3000');
});