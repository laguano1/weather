const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html")
});


app.post("/", function(req, res) {


        var cityId = req.body.cityIdInput;
        console.log(req.body.cityIdInput);


        const units = "imperial";
        const mySecret = process.env['weatherkey'];
        const url = "https://api.openweathermap.org/data/2.5/weather?zip=" + zip +  "&units=" + units + "&APPID=" + apiKey;


      https.get(url, function(response){
          console.log(response.statusCode);

          response.on("data", function(data){
              const weatherData = JSON.parse(data);
              const city = weatherData.name;
              const temp = weatherData.main.temp;
              const humidity = weatherData.main.humidity;
              const windSpeed = weatherData.wind.speed;
              const windDeg = weatherData.wind.deg; 
              const cloudiness = weatherData.clouds.all; 

              res.write(`<h1>The weather in ${city}:</h1>`);
              res.write(`<p>Temperature: ${temp} °F</p>`);
              res.write(`<p>Humidity: ${humidity}%</p>`);
              res.write(`<p>Wind Speed: ${windSpeed} miles/hour, Direction: ${windDeg}°</p>`);
              res.write(`<p>Cloudiness: ${cloudiness}%</p>`);
              res.send();
          });
      });
  });

  app.listen(process.env.PORT || 3000, function() {
      console.log("Server is running on port 3000 or a port set by the environment");
  });