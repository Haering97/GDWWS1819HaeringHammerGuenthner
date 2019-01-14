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
                //console.log(coordinates);
                return coordinates;

            });
    }

    static getInfo(geo1,geo2){

         const promise1 = Fetcher.getVerarbeiteteDaten(geo1);
         promise1.then(function (value) {
             var latlong1 = value;
         });
         const promise2 =Fetcher.getVerarbeiteteDaten(geo2);
             promise2.then(function (value) {
             var  latlong2 = value;
         });
            console.log("\ngetInfo :");
            console.log(latlong1);
            return latlong1;





        var reqURL = "https://api.openrouteservice.org/directions" +
            "?api_key=5b3ce3597851110001cf62489e05bd56cff244a7b5072edc85037ec5" +
            "&coordinates=" +
            "7.750602,50.938415" +
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

        var arrayKoor = [];
               arrayKoor[0] = ergebnisArray.results[0].geometry.lat;
               arrayKoor[1] = ergebnisArray.results[0].geometry.lng;
               return arrayKoor;
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
                var tmp = Fetcher.GetergebnisGeoToCoor(myJson);
                console.log("Fertig Gefetcht : ");
                console.log(tmp);
                return new Promise(function (resolve,reject) {
                    console.log("Its Done");
                    if(tmp != null){
                        resolve(tmp)
                    }else {
                        reject("Failure")
                    }
                })
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
        console.log("Con AVg : "+confidenceAvg);
        /* Durchschnittliche Genauigkeit Ende */


        /* Durchschnittliche Latitude Anfang */
        var LatAvg = 0;

        for(let i = 0 ; i< datenArray[0].length ; i++){
            LatAvg += datenArray[0][i];
        }

        LatAvg = LatAvg / datenArray[0].length;
         console.log("Lat AVg : "+LatAvg);
        /* Durchschnittliche Latitude Ende */


        /* Durchschnittliche Longitude Anfang */
        var LongAvg = 0;

        for(let i = 0 ; i< datenArray[1].length ; i++){
            LongAvg += datenArray[1][i];
        }

        LongAvg = LongAvg / datenArray[1].length;
         console.log("Long AVg : "+ LongAvg);
        /* Durchschnittliche Longitude Ende */





    }








}

module.exports = Fetcher;