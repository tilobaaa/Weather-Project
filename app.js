
//jshint esversion:6
require("dotenv").config();
const express = require("express");
const bodyParser = require('body-parser');
const https = require('https');


const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");


});

app.post("/", function(req,res){

  const apiKey = process.env.API_KEY;
  const unit = "metric";
  const query = req.body.cityName;
  const url = "https://api.openweathermap.org/data/2.5/weather?appid=" + apiKey + "&units=" + unit + "&lang=english&q=" + query;

  https.get(url,function(response){
    response.on("data",function(data){
      console.log(response.statusCode);

      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = " http://openweathermap.org/img/wn/"+ icon +"@2x.png";
      res.write("<p>The weather is currently " + weatherDescription + "</p>");
      res.write("<h1>The temperature in " + query + " right now is " + temp + "degree celsius</h1>" );
      res.write("<img src='"+ imageURL +"'>" );
      res.send();
    });

  });

});

app.listen(3000, function(){
  console.log("server is running on 3000");
});
