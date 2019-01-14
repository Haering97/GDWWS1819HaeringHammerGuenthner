class Fetcher{


     static fetch(){
    }

    static coordinates (url){

        fetch(url)
            .then(function(response) {
                 return response.json();
            })
            .then(function(myJson) {

                var coordinates = myJson.routes[0].geometry;
                console.log(coordinates);
                return coordinates;

            });
    }

    static getInfo(geo1,geo2){
        var reqURL = "https://api.openrouteservice.org/directions" +
            "?api_key=5b3ce3597851110001cf62489e05bd56cff244a7b5072edc85037ec5" +
            "&coordinates=7.750602,50.938415" +
            "|7.560894,51.020356" +
            "&profile=driving-car" +
            "&geometry_format=geojson&geometry_simplify=true&instructions=false";
        this.coordinates(reqURL);
    }


    /*  */
    static coorToGeo(lat, long){

         var url = "https://api.opencagedata.com/geocode/v1/json" +
             "?q=" +
             lat + "+" + long+
             "&key=01a447136c764adc91012c7e9d348dbf ";

         fetch(url)
             .then(function (response) {
                 return response.json();
             })
             .then(function (myJson) {
                 console.log(myJson);
             })
    }



    static GetergebnisGeoToCoor(ergebnisArray) {

        var latAll = [];
        var longAll = [];
        var countryAll = [];
        var cityAll = [];
        var confidenceAll = [];

            for (var index = 0; index < ergebnisArray.results.length; index++) {

                latAll[index] = ergebnisArray.results[index].annotations.DMS.lat;
                longAll[index] = ergebnisArray.results[index].annotations.DMS.lng;
                countryAll[index] = ergebnisArray.results[index].components.country;
                cityAll[index] = ergebnisArray.results[index].components.city;
                confidenceAll[index] = ergebnisArray.results[index].confidence;
            }

            var ergebnisGefiltert = [];
             ergebnisGefiltert[0] = latAll ;
             ergebnisGefiltert[1] = longAll ;
             ergebnisGefiltert[2] = countryAll ;
             ergebnisGefiltert[3] = cityAll ;
             ergebnisGefiltert[4] = confidenceAll ;

             return Fetcher.datenVerarbeiten(ergebnisGefiltert);
    }


    /*  */
    static getVerarbeiteteDaten (place) {

         var url = "https://api.opencagedata.com/geocode/v1/json?" +
             "q=" + place +
             "&key=01a447136c764adc91012c7e9d348dbf";

         fetch(url)
             .then(function (respone) {
                 return respone.json();
             })
             .then(function (myJson) {
                return Fetcher.GetergebnisGeoToCoor(myJson);
             });

    }

    static datenVerarbeiten(datenArray){
         /* datenArray[X]
         * 0 = Lat
         * 1 = Long
         * 2 = Country
         * 3 = City
         * 4 = Confidence
         * BERECHNET :
         *      Average of : Lat , Long , Confidence*/


         /* Durchschnittliche Genauigkeit Anfang */
         var confidenceAvg = 0;

        for(let i = 0 ; i< datenArray[4].length ; i++){
            confidenceAvg += datenArray[4][i];
        }

        confidenceAvg = confidenceAvg / datenArray[4].length;
       // console.log("Con AVg : "+confidenceAvg);
        /* Durchschnittliche Genauigkeit Ende */


        /* Durchschnittliche Latitude Anfang */
        var LatAvg = 0;

        for(let i = 0 ; i< datenArray[0].length ; i++){
            LatAvg += datenArray[0][i];
        }

        LatAvg = LatAvg / datenArray[0].length;
        // console.log("Con AVg : "+confidenceAvg);
        /* Durchschnittliche Latitude Ende */


        /* Durchschnittliche Longitude Anfang */
        var LongAvg = 0;

        for(let i = 0 ; i< datenArray[1].length ; i++){
            LongAvg += datenArray[1][i];
        }

        LongAvg = LongAvg / datenArray[1].length;
        // console.log("Con AVg : "+confidenceAvg);
        /* Durchschnittliche Longitude Ende */





    }








}

module.exports = Fetcher;