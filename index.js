const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

//displays index.html of root path
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html")
});

//invoked after hitting go in the html form
app.post("/", function(req, res) {

    // takes in the zip from the html form, display in // console. Takes in as string, ex. for zip 02139
        var zip = String(req.body.zipInput);
        console.log(req.body.zipInput);

    //build up the URL for the JSON query, API Key is // secret and needs to be obtained by signup 
        const units = "imperial";
        const apiKey = "e602c0b9d0294caac8ac45363c9617b8";
        const url = "https://api.openweathermap.org/data/2.5/weather?zip=" + zip +  "&units=" + units + "&APPID=" + apiKey;

    // this gets the data from Open WeatherPI
    https.get(url, function(response){
        console.log(response.statusCode);

        // gets individual items from Open Weather API
        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const city = weatherData.name;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
          const humidity = weatherData.main.humidity; //addition of humidity 
          const windSpeed = weatherData.wind.speed //addition of wind.speed
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

            // displays the output of the results
          res.write(`<h1>The weather in ${city} is ${weatherDescription}.</h1>`);
          res.write(`<h2>The temperature is ${temp} degrees Fahrenheit.</h2>`);
          res.write(`<p>Humidity: ${humidity}%</p>`); //humidity output
          res.write(`<p>Wind Speed: ${windSpeed} miles/hour</p>`); //wind speed output
          res.write(`<img src=${imageURL}>`);
          res.send();
        });
    });
})


//Code will run on 3000 or any available open port
app.listen(process.env.PORT || 3000, function() {
console.log ("Server is running on port")
});