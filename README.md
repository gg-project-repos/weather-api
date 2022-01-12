# Weather API
1. CURRENT WEATHER
   ===============
   
   ENDPOINT :- /current
   ========

   USING LATITUDE & LONGITUDE
   ==========================
   Request Body : 
   -------------
   {
      "lat" : <latitude_value> ,
      "lon" : <longitude_value>
   }
              OR
   
   USING PLACE
   ===========
   Request Body :
   -------------
   {
      "place" : <city_name> ,
   }
   
   
   Response :
   ==========
   Current Weather Data in JSON 
   
   
2. WEATHER FORECAST UPTO 7 DAYS
   =============================
   
   ENDPOINT :- /forecast
   ========
   
   USING LATITUDE & LONGITUDE
   ==========================
   Request Body : 
   -------------
   {
      "lat" : <latitude_value> ,
      "lon" : <longitude_value> ,
      "numDays" : <number_of_days>
   }
              OR
   
   USING PLACE
   ===========
   Request Body :
   -------------
   {
      "place" : <city_name> ,
      "numDays" : <number_of_days>
   }
   
   Response :
   ==========
   Weather Forecast Data for mentioned number of Days in JSON 
