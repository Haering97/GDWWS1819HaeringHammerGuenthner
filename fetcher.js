class Fetcher{

    // Liefert die Route zwischen 2 ( in der URL definiert ) Punkten wieder
    static coordinates (url) {

        var promise = new Promise(function (resolve, reject) {

            fetch(url)
                .then(function (response) {
                    return response.json();
                })
                .then(function (myJson) {
                    if (myJson) resolve(myJson);
                    else reject("No Data 2");
                });

        });
        return promise;
    }

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

         return new Promise(function (resolve, reject) {


             var promise1 = Fetcher.getVerarbeiteteDaten(geo1,geo2); // Holt sich die lat/long von beiden Orten ( und mehr )

             promise1.then(function (array) {
                 var latlong1 = array[0]; // Infos zum Startpunkt ( lat long plzahl confidence )
                 var latlong2 = array[1];// Infos zum Endpunkt( lat long plzahl confidence )


                 //var promise3 =  Fetcher.getWeather(latlong1,latlong2);


                 var urlRoute = "https://api.openrouteservice.org/directions?api_key=5b3ce3597851110001cf62489e05bd56cff244a7b5072edc85037ec5&coordinates=" + latlong1[1] +"," + latlong1[0] + "%7C" + latlong2[1] + "," +latlong2[0] + "&profile=foot-hiking&preference=recommended&format=geojson&units=m&language=de&extra_info=surface&geometry_simplify=true&instructions=true&instructions_format=html&elevation=true" ;
                 console.log(urlRoute);
                 var promise2 = Fetcher.coordinates(urlRoute); // Holt Route zwischen 2 Punkten


                 promise2.then(function (data) {
                     var coordinates = data.features[0].geometry.coordinates; // Alle Punkte auf der Route
                     var summary = data.features[0].properties.summary[0]; // Zusammenfassung , Dauer , Entfernung , m bergab/bergauf
                     var coordinatesType = data.features[0].geometry.type; // Typ der Koordinaten
                     var timestamp = data.info.timestamp; // Zeitstempel


                     // Höchster Punkt auf der Route
                     var highest = [0,0,0];
                     coordinates.forEach(function (element,index) {
                         if(element[2]>highest[2])highest = element;
                     });

                     console.log(highest);

                     if(summary)resolve(summary);
                     else reject(err);
                 });

                    // Falls keine Route gefunden wird ( oder generell Error )
                 promise2.catch(function (err) {
                     console.log(err);
                 });


             });
         });
     }


    /* Wird von GetInfo benutzt zum lat/long von Orten abzufragen  */
    static getVerarbeiteteDaten (geo1,geo2) {


        var promise = new Promise(function (resolve,reject) {
            var arrayKoor1 = [];
            var arrayKoor2 = [];

                /* Koordinaten für Ort 1 Anfang */
            var url = "https://api.opencagedata.com/geocode/v1/json?" +
                "q=" + geo1 +
                "&key=01a447136c764adc91012c7e9d348dbf";

            fetch(url)
                .then(function (response) {
                    return response.json();
                })
                .then(function (myJson) {
                    arrayKoor1[0] = myJson.results[0].geometry.lat;
                    arrayKoor1[1] = myJson.results[0].geometry.lng;
                    arrayKoor1[2] = myJson.results[0].components.postcode;
                    arrayKoor1[3] = myJson.results[0].confidence;
                });
            /* Koordinaten für Ort 1 Ende */



            /* Koordinaten für Ort 2 Anfang */

            var url2 = "https://api.opencagedata.com/geocode/v1/json?" +
                "q=" + geo2 +
                "&key=01a447136c764adc91012c7e9d348dbf";
            console.log(url2);


            fetch(url2)
                .then(function (response) {
                    return response.json();
                })
                .then(function (myJson) {
                    arrayKoor2[0] = myJson.results[0].geometry.lat;
                    arrayKoor2[1] = myJson.results[0].geometry.lng;
                    arrayKoor2[2] = myJson.results[0].components.postcode;
                    arrayKoor2[3] = myJson.results[0].confidence;

                    /* Koordinaten für Ort 2 Ende*/


                     // Falls für beide ein Ergebnis gefunden wurde ->
                    if(arrayKoor1[1] != null && arrayKoor2[1] != null){
                        var tmpArray = [arrayKoor1,arrayKoor2];
                        resolve(tmpArray); // Promise wird mit gefundenen Daten ausgelöst
                    }
                    else {
                        reject("No data");
                    }

                });




        });

        return promise;

    }
}

module.exports = Fetcher;

/*
static datenVerarbeiten(datenArray){
    /!* datenArray[X]
    * 0 = Lat
    * 1 = Long
    * 2 = Country
    * 3 = City
    * 4 = Confidence
    * BERECHNET :
    *      Average of : Lat , Long , Confidence*!/


    /!* Durchschnittliche Genauigkeit Anfang *!/
    var confidenceAvg = 0;

    for(let i = 0 ; i< datenArray[4].length ; i++){
        confidenceAvg += datenArray[4][i];
    }

    confidenceAvg = confidenceAvg / datenArray[4].length;
    console.log("Con AVg : "+confidenceAvg);
    /!* Durchschnittliche Genauigkeit Ende *!/


    /!* Durchschnittliche Latitude Anfang *!/
    var LatAvg = 0;

    for(let i = 0 ; i< datenArray[0].length ; i++){
        LatAvg += datenArray[0][i];
    }

    LatAvg = LatAvg / datenArray[0].length;
    console.log("Lat AVg : "+LatAvg);
    /!* Durchschnittliche Latitude Ende *!/


    /!* Durchschnittliche Longitude Anfang *!/
    var LongAvg = 0;

    for(let i = 0 ; i< datenArray[1].length ; i++){
        LongAvg += datenArray[1][i];
    }

    LongAvg = LongAvg / datenArray[1].length;
    console.log("Long AVg : "+ LongAvg);
/!* Durchschnittliche Longitude Ende *!/*/



