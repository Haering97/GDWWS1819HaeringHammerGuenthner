var poi = require('./poi');
var fs = require('fs');
var path = require('path');
class Fetcher{

    // Noch nicht ordentlich implementiert

   /* static getWeather(latlong1,latlong2){
         return new Promise(function (resolve, reject) {

                var url1 = "http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=h4SEQjr8kojz6kIL0EBXqO4wXbVZNnl7&q="+ latlong1[0] +"%2C"+ latlong1[1];
                fetch(url1)
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (myJson) {
                        console.log("keyShit");
                        console.log(myJson);
                        var key1 = myJson.Key;
                    });

                     var url2 = "http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=h4SEQjr8kojz6kIL0EBXqO4wXbVZNnl7&q="+ latlong2[0] +"%2C"+ latlong2[1];
                     fetch(url2)
                         .then(function (response) {
                             response.json();
                         })
                         .then(function (myJson) {
                             var key2 = myJson.Key;
                         });

                     if(key1 && key2)resolve(key1);
                     else reject(err);

         });
    }*/

   // Liefert alle Infos zu einer Route/Weg an den Router zurück
    static getInfo(geo1,geo2) {
        console.log("getInfo aufgerufen");

        return new Promise(function (resolve,reject) {
            var result = [];
            f();

            async function f() {
                console.log("async aufgerufen");

                if(/^[a-z]+$/i.test(geo1) && /^[a-z]+$/i.test(geo2)){ // Prüft ob Geo1/2 nur Buchtaben enthält -> Ortsname
                    console.log("Orte als String");
                    var koordinaten = await Promise.all([

                        Fetcher.OrtzuKoor(geo1),
                        Fetcher.OrtzuKoor(geo2)
                    ]);

                }
                else {
                    var koordinaten = [geo1,geo2];
                }

                try {

                    var responseRoute = await fetch("https://api.openrouteservice.org/directions?api_key=5b3ce3597851110001cf62489e05bd56cff244a7b5072edc85037ec5&coordinates="
                        + koordinaten[0][1] +"," + koordinaten[0][0] + "%7C" + koordinaten[1][1] + "," +koordinaten[1][0] +
                        "&profile=foot-hiking&preference=recommended&format=geojson&units=m&language=de&extra_info=surface&geometry_simplify=true&instructions=true&instructions_format=html&elevation=true"
                    );

                    var route = await responseRoute.json();


                    var coordinates = route.features[0].geometry.coordinates; // Alle Punkte auf der Route
                    var summary = route.features[0].properties.summary[0]; // Zusammenfassung , Dauer , Entfernung , m bergab/bergauf
                    var coordinatesType = route.features[0].geometry.type; // Typ der Koordinaten
                    var timestamp = route.info.timestamp; // Zeitstempel
                    var instructions = route.features[0].properties.segments[0].steps;
                    var instructionsArray = [];

                    instructions.forEach(function (element) {
                        instructionsArray.push(element.instruction);
                    });

                    var startWeatherResponse = await fetch("https://api.openweathermap.org/data/2.5/forecast?" +
                        "lat=" + koordinaten[0][0] + "&lon=" + koordinaten[0][1]
                        + "&units=metric&appid=fdfdaf78b353c4f917159c1d838d1ab3");

                    var startWeather = await startWeatherResponse.json();
                    var threeTempList = [];


                    for (let i = 0; i < 3; i++) {
                        threeTempList.push(startWeather.list[i].dt_txt, startWeather.list[i].main.temp)
                    }


                    var checkTemp = 5;
                    var tempAlert = "Keine Temperaturwarnung!"

                    if(startWeather.list[0].main.temp - startWeather.list[1].main.temp > checkTemp){
                        tempAlert = "Vorsicht in den nächsten Stunden sinkt die Temperatur um "+ checkTemp +" Grad Celsius!"
                    }

                    var rainAlert = "Keine Regenwarnung!";

                    if(startWeather.list[0].weather[0].main == "Rain" && startWeather.list[1].weather[0].main == "Rain"){
                        rainAlert = "Voraussichtlich wird es unterwegs regnen!"
                    }



                }catch (e) {
                    console.log(e);
                }

                if(coordinates){

                    var poiNah = await poi.getPOIsNähe(coordinates);

                }

                    result.push(coordinates,summary,poiNah,instructionsArray,timestamp,tempAlert,rainAlert,threeTempList);
                    resolve(result);
            }
        });
    }


    static OrtzuKoor (ort) {

        return  new Promise(function (resolve, reject) {

            var arrayKoor = [];
            var url = "https://api.opencagedata.com/geocode/v1/json?" +
                "q=" + ort +
                "&key=01a447136c764adc91012c7e9d348dbf";

            fetch(url)
                .then(function (response) {
                    return response.json();
                })
                .then(function (myJson) {
                    arrayKoor[0] = myJson.results[0].geometry.lat;
                    arrayKoor[1] = myJson.results[0].geometry.lng;
                    arrayKoor[2] = myJson.results[0].components.postcode;
                    arrayKoor[3] = myJson.results[0].confidence;
                    resolve(arrayKoor);
                })
                .catch(function () {
                    console.log("Ort zu Koordinaten Fehler");
                    reject(err);
                });
        });
    }

}

module.exports = Fetcher;



