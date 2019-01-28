var express = require('express');
var router = express.Router(); // Express Router
var fetcher = require('./fetcher'); // Eigenes "Modul"
var fs = require('fs'); // NodeJs FileSystem Modul
var poi = require('./poi'); // Eigenes "Modul"

// Routing


router.get('/',function (req,res,next) {
    res.send("Root");
    fetcher.getVerarbeiteteDaten("London");
   // fetcher.coorToGeo("51.509865","-0.118092")
});

router.get('/:start',function (req,res,next) {
    var geo = req.params.start;
    res.send(geo);
});



// Liefert Route + Infos zurück
router.get('/:start/:ziel',function (req,res,next) {
    var start = req.params.start;
    var ziel= req.params.ziel;
    var tmp = fetcher.getInfo(start,ziel);
    tmp.then(function (summary) {
       res.send(summary);
    });

    tmp.catch(function (error) {
        res.send(error)
    })
});


/*router.get('/:start/:ziel/:startT',function(req,res,next){
    var start = req.params.start;
    var ziel= req.params.ziel;
    var starT = req.params.startT;


    var tmp = fetcher.getInfo(start,ziel);
    tmp.then(function (summary) {
        res.send(summary);
    });

    tmp.catch(function (error) {
        res.send(error)
    })
});*/



var lauf = 0; // um Pois nacheinander einzufügen
var poisArray = ["Pois"]; // Array in dem die Pois gespeichert werden


// Hinzufügen von POIS
router.post('/poi/:lat/:lon/:kat',function (req,res,next) {

    // Erstellt neuen POI
    var poi2 = poi.createNewPoi(lauf++,req.params.lat,req.params.lon,req.params.kat);
    poisArray[lauf] = poi2;

    // Speichert neuen POI lokal ab
    fs.writeFile("./pois/pois.json", JSON.stringify(poisArray),function () {
        console.log("File Written");
    });

    res.send(poi2);
});


// Löscht bestimmten POI
router.delete('/poi/:lat/:lon/',function (req,res,next) {

    var lat = req.params.lat;
    var lon = req.params.lon;
    var removed;

    // Liest bereits vorhandene POIS ein
    fs.readFile('./pois/pois.json', function (err,file) {
        if(err) {
            res.send("Error Deleting POI");
            throw err;
        }

        // Sucht passenden POI
        var data = JSON.parse(file);
        data.forEach(function (element,index) {
            if(element.lat != null && element.lon != null ){

                if(lat === element.lat && lon === element.lon){ // Beides MÜSSEN Zahlen sein ( === )
                        removed = data.splice(index,1);
                }
            }
        });

        // Speichert veränderten Array wieder ab
        fs.writeFile("./pois/pois.json", JSON.stringify(data),function () {
            if(removed != null){

                res.send(removed);
            }
            else res.send("No Poi found");
        });

    });

});


// Aktualisiert die Kategorie eines bestimmten POIS
router.put('/poi/:lat/:lon/:kat',function (req,res,next) {

    var lat = req.params.lat;
    var lon = req.params.lon;
    var katNeu = req.params.kat;

    // Liest vorhandene POIs ein
    fs.readFile('./pois/pois.json', function (err,file) {
        if(err) {
            res.send("Error Updating POI");
            throw err;
        }

        // Sucht passenden POI
        var data = JSON.parse(file);
        var neu;
        data.forEach(function (element) {
            if(element.lat != null && element.lon != null ){

                if(lat === element.lat && lon === element.lon){ // Beides MÜSSEN Zahlen sein ( === )
                    element.kategorie = katNeu; // Aktualisiert POI mit neuer Kategorie
                    neu = element;
                }
            }
        });
            // Speichert Änderung ab
        fs.writeFile("./pois/pois.json", JSON.stringify(data),function () {
                console.log("Aktualisiert ! ")
        });
        res.send(neu);
    });
});

// Ruft bestimmten POI ab
router.get('/poi/:lat/:lon',function (req,res,next) {

    var lat = req.params.lat;
    var lon = req.params.lon;

    // Liest vorhandene POIs ein
    fs.readFile('./pois/pois.json', function (err,file) {
        if(err) {
            res.send("Error Updating POI");
            throw err;
        }

        // Sucht passenden POI
        var data = JSON.parse(file);
        data.forEach(function (element) {
            if(element.lat != null && element.lon != null ){

                if(lat === element.lat && lon === element.lon){ // Beides MÜSSEN Zahlen sein ( === )
                    res.send(element); // Gibt passenden POI zurück
                }
            }
        });
    });

});




module.exports = router;