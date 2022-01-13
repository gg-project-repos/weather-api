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
   
   
   
