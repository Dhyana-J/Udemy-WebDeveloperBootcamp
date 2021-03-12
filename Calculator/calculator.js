
const express = require('express');
//const bodyParser = require('body-parser');

const app = express();
//app.use(bodyParser.urlencoded({extended:true})); //bodyParser deprecated.
app.use(express.urlencoded({extended:false})); //using instead this line (express자체에 bodyparser 내장됨)
//extended:true는 객체묶음 post를 허용한다 명시해줘야한다.


app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html');
});


app.post('/dodo',(req,res)=>{
    
    let num1 = req.body.n1;
    let num2 = req.body.n2;
    
    let result = parseInt(num1) + parseInt(num2);
    
    res.send(`The result of your calculation is ${result}`);
});


app.get('/bmicalculator',(req,res)=>{
    res.sendFile(`${__dirname}/bmiCalculator.html`);
});


app.post('/bmicalculator',(req,res)=>{
    console.log(req.body);
    
    const height = Number(req.body.height)/100; // cm -> m 로 변환하기 위해 100 나눈다.
    const weight = Number(req.body.weight);
    const bmi = Math.round(weight*100/(height**2))/100; //소수점 둘째자리까지 표기

    res.send(`Your BMI is ${bmi}`);
});


app.listen(3000,()=>{
    console.log('Server started on port 3000');
});


