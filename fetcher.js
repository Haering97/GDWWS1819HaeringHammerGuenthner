


class Fetcher{


    static coordinates (url){

        fetch(url)
            .then(function(response) {
                 return response.json();
            })
            .then(function(myJson) {

                /*console.log(myJson);
                console.log("----------------\n");
                console.log(myJson.routes);
                console.log("----------------\n");
                console.log(myJson.routes[0].geometry);*/

                var coordinates = myJson.routes[0].geometry;
                console.log(coordinates);
                return coordinates;

            });
    }

    static getInfo(geo1,geo2){
        var reqURL = "https://api.openrouteservice.org/directions?api_key=5b3ce3597851110001cf62489e05bd56cff244a7b5072edc85037ec5&coordinates=7.750602,50.938415|7.560894,51.020356&profile=driving-car&geometry_format=geojson&geometry_simplify=true&instructions=false";
        this.coordinates(reqURL);
    }

/*
    50.938415,7.750602%7C51.023056,7.560894
    7.750602,50.938415|7.560894,51.020356
*/
}

module.exports = Fetcher;