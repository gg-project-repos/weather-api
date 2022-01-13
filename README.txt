Weather API Documentation
=========================

STEPS TO DEPLOY AND RUN :
========================
1. Install Node JS
2. Install NPM
3. Run npm install
4. Run npm start / node index.js


1. CURRENT WEATHER
   ===============
   
   ENDPOINT :- /current
   ========
   
   Method - POST

   USING LATITUDE & LONGITUDE
   ==========================
   Request Body (JSON) : 
   -------------------
   {
      "lat" : <latitude_value> ,
      "lon" : <longitude_value>
   }
              OR
   
   USING PLACE
   ===========
   Request Body (JSON) : 
   -------------------
   {
      "place" : <city_name>
   }
   
   
   Response :
   ==========
   Current Weather Data in JSON
   
   EXAMPLE : 
   ========
   
   Request Body :
   ------------
   {
    "place" : "Delhi"
   }
   
   Response :
   ----------
   {
    "current_weather_data": {
        "sunrise": 1642038303,
        "sunset": 1642076030,
        "pressure": 1019,
        "humidity": 100,
        "dew_point": 8.06,
        "clouds": 100,
        "visibility": 50,
        "wind_speed": 0,
        "wind_deg": 0,
        "weather": [
            {
                "main": "Fog",
                "description": "fog"
            }
        ],
        "Temperature": 8.06,
        "Temp_Feels_Like": 8.06,
        "UV_Index": 0.51
    }
}
   
   
2. WEATHER FORECAST UPTO 7 DAYS
   =============================
   
   ENDPOINT :- /forecast
   ========
   
   Method - POST
   
   USING LATITUDE & LONGITUDE
   ==========================
   Request Body (JSON) : 
   -------------------
   {
      "lat" : <latitude_value> ,
      "lon" : <longitude_value> ,
      "numDays" : <number_of_days>
   }
              OR
   
   USING PLACE
   ===========
   Request Body (JSON) : 
   -------------------
   {
      "place" : <city_name> ,
      "numDays" : <number_of_days>
   }
   
   Response :
   ==========
   Weather Forecast Data for mentioned number of Days in JSON
   
   EXAMPLE :
   =========
   
   Request Body :
   ------------
   {
    "place" : "Delhi",
    "numDays" : 3
   }
   
   Response :
   ----------
   {
    "forecast_data": {
        "day_0": {
            "Max Temp in Celsius": 18.94,
            "Min Temp in Celsius": 8.06,
            "Feels Like Temp in Celsius": 12.69,
            "Weather Description": "Clouds",
            "UV Index": 3.81,
            "Probability of Precipitation": 0,
            "Humidity": 71,
            "Atm Pressure in hPa": 1019,
            "Wind Speed in m/s": 1.41,
            "Wind Direction in deg": 215,
            "Rain Volume(in mm)": 0
        },
        "day_1": {
            "Max Temp in Celsius": 19.64,
            "Min Temp in Celsius": 11.57,
            "Feels Like Temp in Celsius": 16.69,
            "Weather Description": "Clear",
            "UV Index": 3.91,
            "Probability of Precipitation": 0,
            "Humidity": 55,
            "Atm Pressure in hPa": 1019,
            "Wind Speed in m/s": 1.59,
            "Wind Direction in deg": 347,
            "Rain Volume(in mm)": 0
        },
        "day_2": {
            "Max Temp in Celsius": 20.57,
            "Min Temp in Celsius": 11.62,
            "Feels Like Temp in Celsius": 16.92,
            "Weather Description": "Clear",
            "UV Index": 4.32,
            "Probability of Precipitation": 0,
            "Humidity": 48,
            "Atm Pressure in hPa": 1020,
            "Wind Speed in m/s": 2.17,
            "Wind Direction in deg": 329,
            "Rain Volume(in mm)": 0
        }
    }
}
   
   
   
   
