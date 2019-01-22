class Fetcher{


     static fetch(){
    }

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




    static getInfo(geo1,geo2) {

            var promise = new Promise(function (resolve, reject) {

                var data1=[];
                var data2=[];
                var latlong1 = Fetcher.getVerarbeiteteDaten(geo1);
                latlong1.then(function (data) {
                    console.log("data 1 : " + data);
                         data1 = data;
                });

             var latlong2 = Fetcher.getVerarbeiteteDaten(geo2);
              latlong2.then(function (data) {
                  console.log("data 2 " + data);
                     data2 = data;
              });

                if(data1[1] && data2[1]){
                    resolve(data1,data2);
                }
                else reject("NO data 1");

            });
        promise.then(function (data1,data2) {

            var promise2 = Fetcher.coordinates("https://api.openrouteservice.org/directions" +
                    "?api_key=5b3ce3597851110001cf62489e05bd56cff244a7b5072edc85037ec5" +
                    "&coordinates=" + data1[0]+
                    "," + data1[1] +
                    data2[0]+"|,51.020356" + data2[1]+
                    "&profile=foot-walking" +
                    "&geometry_format=geojson&geometry_simplify=true&instructions=false%preference=recommended");

                 promise2.then(function (data) {
                var coordinates = data.routes[0].geometry;
                console.log("coordinates");
                console.log(coordinates);
                return coordinates;
                   });

                 promise2.catch(function (err) {
                     console.log(err);
                 })

            });
    }

    /*  */
    static getVerarbeiteteDaten (place) {


        var promise = new Promise(function (resolve,reject) {
            var arrayKoor = [];


            var url = "https://api.opencagedata.com/geocode/v1/json?" +
                "q=" + place +
                "&key=01a447136c764adc91012c7e9d348dbf";

            fetch(url)
                .then(function (response) {
                    console.log("responded");
                    return response.json();
                })
                .then(function (myJson) {
                    console.log("Fertig Gefetcht : ");
                    arrayKoor[0] = myJson.results[0].geometry.lat;
                    arrayKoor[1] = myJson.results[0].geometry.lng;
                    console.log("arrayKoor gesetzt");

                    if(arrayKoor[0] != null && arrayKoor[1] != null){
                        resolve(arrayKoor);
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



