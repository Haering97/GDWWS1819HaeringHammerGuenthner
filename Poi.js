

class Poi{

    constructor(id,lat,lon,kategorie){
        this.id = id;
        this.lat = lat;
        this.lon = lon;
        this.kategorie = kategorie;
    }

    measure(lat1, lon1){  // generally used geo measurement function
        var R = 6378.137; // Radius of earth in KM
        var dLat = this.lat * Math.PI / 180 - lat1 * Math.PI / 180;
        var dLon = this.lon * Math.PI / 180 - lon1 * Math.PI / 180;
        var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(this.lat * Math.PI / 180) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        var d = R * c;
        return d * 1000; // meters
    }







}