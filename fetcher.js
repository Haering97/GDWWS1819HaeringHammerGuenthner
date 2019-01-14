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

    static geoToCoor (place) {

         var url = "https://api.opencagedata.com/geocode/v1/json?" +
             "q=" + place +
             "&key=01a447136c764adc91012c7e9d348dbf";

         fetch(url)
             .then(function (respone) {
                 return respone.json();
             })
             .then(function (myJson) {
                 console.log(myJson)
             })

    }



}

module.exports = Fetcher;