const express = require('express');
const https = require('https');


const app = express();

app.use(express.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html');
});

app.post('/',(req,res)=>{
    console.log('Post request received');
    const query = req.body.cityName;
    const apiKey = '';
    const unit = 'metric';
    const url = `https://api.openweathermap.org/data/2.5/weather?units=${unit}&q=${query}&appid=${apiKey}`;
    
    https.get(url,(response)=>{
    
        console.log(response.statusCode);
    
        response.on('data',(data)=>{
    
            console.log(data);//hexadecimal code of JSON object 
    
            const weatherData = JSON.parse(data);
            console.log(weatherData);//JavaScript object
    
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;
    
            //res.send는 딱 한 번만 할 수 있다. 그래서 write를 통해 보낼 응답을 장전할 수 있다.
            res.write(`<h1>The temperature in ${query} is ${temp} degrees Celcius.</h1>`);
            res.write(`<p>The Weather is currently ${weatherDescription}</p>`);
            res.write(`<img src="${icon}" alt="weather-img">`);
            res.send();
        });
    });
})


app.listen(3000,()=>{
    console.log('Server is running on port 3000.');
});
