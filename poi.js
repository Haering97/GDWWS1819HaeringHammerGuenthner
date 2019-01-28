class Poi{



    static  createNewPoi(id,lat,lon,kategorie){
        var poi = new Object();
        poi.id = id;
        poi.lat = lat;
        poi.lon = lon;
        poi.kategorie = kategorie;
        return poi;
    }
    // #StackOverflow

    static  measure(lat1, lon1,lat2,lon2){// generally used geo measurement function

        var R = 6378.137; // Radius of earth in KM
        var dLat = lat2 * Math.PI / 180 - lat1 * Math.PI / 180;
        var dLon = lon2 * Math.PI / 180 - lon1 * Math.PI / 180;
        var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        var d = R * c;
        var result =  d * 1000; // meters
        return result;
    }

    static getPOIsNähe(coordinates){

        return new Promise(function (resolve, reject) {

            var fs = require('fs');
            var pois;
            var result =[];
            fs.readFile('./pois/pois.json', function (err,file) {
                if(err) {
                    throw err;
                }
                else{
                    pois=JSON.parse(file);

                    for(var i = 1 ; i < pois.length ; i ++ ){
                        coordinates.forEach(function (element) {
                            if(Poi.measure(element[1],element[0],pois[i].lat,pois[i].lon) < 500){
                                if(!result.includes(pois[i]))result.push(pois[i]);
                                console.log("POI gefunden");
                            }
                        });
                    }
                    if(result[0]!= null )resolve(result);
                    else reject("Keine Pois in der Nähe gefunden");
                }
            });

        });
    }
}
module.exports = Poi;





