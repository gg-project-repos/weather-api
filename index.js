const express = require('express');        
const app = express();                 
const bodyParser = require('body-parser');
const axios = require("axios");

const CURRENT_API_KEY = "99fd951189e74fb157e7505853fde01d" ;
const FORECAST_API_KEY = "0c0e9af1a4104dabb2b34814212911" ;
const CURRENT = "CURRENT";
const FORECAST = "FORECAST";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 5000;

const UNITS = "metric"
var lat, lon ;
var numDays ;

app.get('/', function(req, res) {
    res.send("Please send a POST request with Body")
})

// CURRENT WEATHER ENDPOINT
app.post('/current', async function(req, res) {
    var params = req.body;
    console.log(params);
    var resData = {}
    resData["current_weather_data"] = await weatherHandler(params, CURRENT)
    res.json(resData)
});

// FORECAST WEATHER ENDPOINT
app.post('/forecast', async function(req, res) {
    var params = req.body;
    console.log(params);
    var resData = {};
    resData["forecast_data"] = await weatherHandler(params, FORECAST)
    res.json(resData)
});

async function weatherHandler (params, dataNeeded) {

    var place = params.place;
    var paramKeys = Object.keys(params)
    
    if(paramKeys.includes("lat") && paramKeys.includes("lon")) {
        lat = params.lat
        lon = params.lon
    }
    else if(paramKeys.includes("place")) {
        latLongObj = await getLatLongFromPlace(place)
        lat = latLongObj[0]["lat"]
        lon = latLongObj[0]["lon"]
    }

    if(dataNeeded=="FORECAST") {
        numDays = params.numDays;
    }
    
    try {
        
        var data = {}

        if(dataNeeded == "CURRENT") {
            data = await getOneCallAPIData();
            data = data["current_weather_data"]
            data["Temperature"] = data["temp"]
            data["Temp_Feels_Like"] = data["feels_like"]
            data["UV_Index"] = data["uvi"]
            delete data.dt
            delete data.temp
            delete data.uvi
            delete data.wind_gust
            delete data.feels_like
        }
        else if (dataNeeded == "FORECAST") {
            // numDays>3 &&
            if(numDays<=7) {
                var reqDays = {};
                data = await getOneCallAPIData();
                data = data["next_7_days_data"]
                for (var i=0; i<numDays; i++) {
                    reqDays["day_"+i] = data[i]
                }
                for(var key in reqDays) {
                    reqDays[key]["Max Temp in Celsius"] = reqDays[key].temp.max
                    reqDays[key]["Min Temp in Celsius"] = reqDays[key].temp.min
                    reqDays[key]["Feels Like Temp in Celsius"] = reqDays[key].feels_like.day
                    reqDays[key]["Weather Description"] = reqDays[key].weather[0].main
                    reqDays[key]["UV Index"] = reqDays[key].uvi
                    reqDays[key]["Probability of Precipitation"] = reqDays[key].pop
                    reqDays[key]["Humidity"] = reqDays[key].humidity
                    reqDays[key]["Atm Pressure in hPa"] = reqDays[key].pressure
                    reqDays[key]["Wind Speed in m/s"] = reqDays[key].wind_speed
                    reqDays[key]["Wind Direction in deg"] = reqDays[key].wind_deg
                    reqDays[key]["Rain Volume(in mm)"] = (reqDays[key].rain) ? reqDays[key].rain : 0
                    delete reqDays[key].dt
                    delete reqDays[key].sunrise
                    delete reqDays[key].sunset
                    delete reqDays[key].moonrise
                    delete reqDays[key].moonset
                    delete reqDays[key].clouds
                    delete reqDays[key].dew_point
                    delete reqDays[key].humidity
                    delete reqDays[key].pressure
                    delete reqDays[key].wind_speed
                    delete reqDays[key].wind_deg
                    delete reqDays[key].rain
                    delete reqDays[key].pop
                    delete reqDays[key].temp
                    delete reqDays[key].feels_like
                    delete reqDays[key].moon_phase
                    delete reqDays[key].sunset
                    delete reqDays[key].weather
                    delete reqDays[key].uvi
                    delete reqDays[key].wind_gust
                }

                data = reqDays
            }
            else {
                data = await getForecastFromWeatherAPI();
            }
        }

        return data
    }
    catch (e) {
        console.log(e)
    }
}

async function getLatLongFromPlace (place) {
    var URL = "http://api.openweathermap.org/geo/1.0/direct"
    URL = URL + "?q=" + place + "&limit=1&appid=" + CURRENT_API_KEY
    var r = await axios.get(URL)
    return r["data"]
}

async function getOneCallAPIData() {
    var URL = "https://api.openweathermap.org/data/2.5/onecall"
    URL = URL + "?lat=" + lat + "&lon=" + lon + "&appid=" + CURRENT_API_KEY + "&units=" + UNITS
    var oneCallData = await axios.get(URL)
    oneCallData = oneCallData["data"]
    var requiredData = {}
    requiredData["current_weather_data"] = oneCallData["current"]
    requiredData["next_7_days_data"] = oneCallData["daily"]

    if (Object.keys(oneCallData).includes("alerts")) {
        requiredData["govt_alerts"] = oneCallData["alerts"]
    }
    else {
        requiredData["govt_alerts"] = "No Alerts Issued !"
    }

    delete requiredData["current_weather_data"]["weather"][0]["icon"]
    delete requiredData["current_weather_data"]["weather"][0]["id"]

    requiredData["next_7_days_data"].forEach((item) => {
        delete item["weather"][0]["icon"]
        delete item["weather"][0]["id"]
    })

    return requiredData;
}

async function getForecastFromWeatherAPI() {
    var URL = "https://api.weatherapi.com/v1/forecast.json"
    URL = URL + "?key=" + FORECAST_API_KEY + "&q=" + lat + "," + lon + "&days=" + numDays
    var data = await axios.get(URL)
    data = data["data"]
    var k = 0
    var requiredData = {}
    data["forecast"]["forecastday"].forEach((item) => {
        requiredData["day_"+k] = item
        requiredData["day_"+k]["astronomical"] = item["astro"]
        requiredData["day_"+k]["condition"] = item["day"]["condition"]["text"]
        requiredData["day_"+k]["day"]["Chance Of Rain"] = item["day"]["daily_chance_of_rain"] + " %"
        requiredData["day_"+k]["day"]["Will It Rain"] = (item["day"]["daily_will_it_rain"]) ? "YES" : "NO"

        requiredData["day_"+k]["day"]["Max Temp in Celsius"] = item["day"]["maxtemp_c"]
        requiredData["day_"+k]["day"]["Min Temp in Celsius"] = item["day"]["mintemp_c"]
        requiredData["day_"+k]["day"]["Avg Temp in Celsius"] = item["day"]["avgtemp_c"]
        requiredData["day_"+k]["day"]["Max Wind in Kmph"] = item["day"]["maxwind_kph"]
        requiredData["day_"+k]["day"]["Total Precip in mm"] = item["day"]["totalprecip_mm"]
        requiredData["day_"+k]["day"]["Total Precip in inches"] = item["day"]["totalprecip_in"]
        requiredData["day_"+k]["day"]["Avg Visibility in Km"] = item["day"]["avgvis_km"]
        requiredData["day_"+k]["day"]["Avg Humidity"] = item["day"]["avghumidity"]
        requiredData["day_"+k]["day"]["UV Radiation"] = item["day"]["uv"]

        delete requiredData["day_"+k]["astro"]
        delete requiredData["day_"+k]["day"]["condition"]
        delete requiredData["day_"+k]["day"]["daily_chance_of_rain"]
        delete requiredData["day_"+k]["day"]["daily_chance_of_snow"]
        delete requiredData["day_"+k]["day"]["daily_will_it_rain"]
        delete requiredData["day_"+k]["day"]["daily_will_it_snow"]
        delete requiredData["day_"+k]["day"]["maxtemp_f"]
        delete requiredData["day_"+k]["day"]["maxtemp_c"]
        delete requiredData["day_"+k]["day"]["mintemp_f"]
        delete requiredData["day_"+k]["day"]["mintemp_c"]
        delete requiredData["day_"+k]["day"]["avgtemp_f"]
        delete requiredData["day_"+k]["day"]["avgtemp_c"]
        delete requiredData["day_"+k]["day"]["maxwind_mph"]
        delete requiredData["day_"+k]["day"]["maxwind_kph"]
        delete requiredData["day_"+k]["day"]["totalprecip_mm"]
        delete requiredData["day_"+k]["day"]["totalprecip_in"]
        delete requiredData["day_"+k]["day"]["avgvis_km"]
        delete requiredData["day_"+k]["day"]["avgvis_miles"]
        delete requiredData["day_"+k]["day"]["avghumidity"]
        delete requiredData["day_"+k]["day"]["uv"]

        requiredData["day_"+k] = item["day"]

        k = k + 1
    });
    return requiredData
}

var server = app.listen(port, function() {
    console.log("Weather API Server Running on http://localhost:5000")
})
