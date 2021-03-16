
const express = require('express');
const https = require('https');
const mailchimp = require('@mailchimp/mailchimp_marketing');

const app = express();


app.use(express.urlencoded({extended:true}));
app.use(express.static('public')); //서버가 static file들(img,css,js, ...)을 제공하기 위해 필요하다. public은 폴더명


mailchimp.setConfig({
    apiKey: '',
    server: '',
});



app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/signup.html');
});


app.post('/',(req,res)=>{

    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const listId = '';

    const subscribingUser = {
        firstName:firstName,
        lastName:lastName,
        email:email
    }

    const run = async ()=>{

        const response = await mailchimp.lists.addListMember(listId,{
            email_address:subscribingUser.email,
            status:'subscribed',
            merge_fields:{
                FNAME:subscribingUser.firstName,
                LNAME:subscribingUser.lastName
            }
        });

        console.log(`Successfully added contact as an audience member. The contact's id is ${
            response.id
        }.`);

    };

    run();

});//end of app.post()

app.listen('3000',()=>{
    console.log('server is running on port 3000');
});




