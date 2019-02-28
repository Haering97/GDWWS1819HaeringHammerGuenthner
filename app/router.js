var express = require('express');
var router = express.Router(); // Express Router
var fetcher = require('./fetcher'); // Eigenes "Modul"
var fs = require('fs'); // NodeJs FileSystem Modul
var path = require('path');
var poi = require('./poi'); // Eigenes "Modul"

// Routing

// Liefert Route + Infos zurück

router.post('/route/:id',function (req,res,next) {
    var start = req.query.start;
    var ziel = req.query.ziel;
    var id = req.params.id;

    fs.readFile(path.join(__dirname, '..', 'routes/routes.json') ,function (err,file) {
        if(err)res.status(404).send("Error File Not Found");
        else {
            var data = JSON.parse(file);

            if(start !=null && ziel != null && id != null){
                if(data[id] != null){
                    res.send("Eine Route mit der ID existiert bereits");
                }
                else {
                var tmp = {};
                tmp.start = start;
                tmp.ziel = ziel;
                data[id] = tmp;

                fs.writeFile(path.join(__dirname, '..', 'routes/routes.json'), JSON.stringify(data));

                res.status(200).send(tmp);

                }}
        }
    })

});

router.put('/route/:id',function (req,res,next) {

    var start = req.query.start;
    var ziel = req.query.ziel;
    var id = req.params.id;

        fs.readFile(path.join(__dirname, '..', 'routes/routes.json'),function (err,file) {
            if(err)res.status(404).send("File Not Found");
            else {

                var data = JSON.parse(file);

                if(data[id] != null ){
                        var tmp = data[id];
                        if(start != null) tmp.start = start;
                        if(ziel != null) tmp.ziel = ziel;
                        data [id] = tmp;
                        fs.writeFile(path.join(__dirname, '..', 'routes/routes.json'), JSON.stringify(data), function () {
                            res.status(200).send("Route aktualisiert")
                        });
                }
                else{
                    res.status(404).send("Keine Route mit dieser ID gefunden");
                }
            }
        })

});

// Löscher entstehen beim löschen
router.delete('/route/:id',function (req,res,next) {

    const id = req.params.id;

    fs.readFile(path.join(__dirname, '..', 'routes/routes.json'),function (err,file) {
       if(err)res.status(404).send("File nicht gefunden");
       else {
           var data = JSON.parse(file);
           if(data[id] != null){
               var tmp = data[id];
               data[id] = null;
               fs.writeFile('../routes/routes.json', JSON.stringify(data),function () {
                   res.status(200).send("Route gelöscht" + tmp);
               });
           }
           else{
               res.status(404).send("Keine Route mit dieser ID gefunden");
           }
       }
    });

});

router.get('/route/:id',function (req,res,next) {

    var id= req.params.id;
    fs.readFile(path.join(__dirname, '..', 'routes/routes.json') , function (err,file) {
        if(err)res.status(404).send("File Not Found");
        else {
            var data = JSON.parse(file);
            if (data[id] != null) {

                var tmp = fetcher.getInfo(data[id].start,data[id].ziel);
                tmp.then(function (data) {
                    res.status(200).send(data);
                });

                tmp.catch(function (error) {
                    res.status(500).send(error)
                })
            }
            else {
                res.status(404).send("Keine Route mit dieser ID gefunden");
            }
        }});


});



router.get('/route',function (req,res,next) {

    var id= req.params.id;
    fs.readFile(path.join(__dirname, '..', 'routes/routes.json') , function (err,file) {
        if(err)res.status(404).send("File Not Found");
        else {
            var data = JSON.parse(file);
            if (data != null) {

                res.status(200).send(data);
            }
            else {
                res.status(404).send("Keine Route mit dieser ID gefunden");
            }
        }});


});



// Hinzufügen von POIS
router.post('/poi/:id',function (req,res,next) {

    var id = req.params.id;


    fs.readFile(path.join(__dirname, '..', 'pois/pois.json'), function (err,file) {
       if (err) res.send("Fehler beim hinzufügen");
       else {
           var data = JSON.parse(file);
           if(data[id] == null){
               data[id] = poi.createNewPoi(id,req.query.lat,req.query.lon,req.query.kat);

               // Speichert neuen POI lokal ab
               fs.writeFile("./pois/pois.json", JSON.stringify(data),function () {
                   console.log("File Written");
               });
               res.status(201).send(data[id]);

           }
           else res.send("Existiert bereits")
       }
    });

});


// Löscht bestimmten POI
router.delete('/poi/:id',function (req,res,next) {

    var id = req.params.id;
    var removed;


    // Liest bereits vorhandene POIS ein
    fs.readFile(path.join(__dirname, '..', 'pois/pois.json'), function (err,file) {
        if(err) {
            res.status(500).send("Error Reading File");
            throw err;
        }
        else {

            var data = JSON.parse(file);
            removed = data[id];
            data[id] = null ;

            // Speichert veränderten Array wieder ab
            fs.writeFile(path.join(__dirname, '..', 'pois/pois.json'), JSON.stringify(data),function () {
                if(removed != null){

                    res.status(200).send(removed);
                }
                else res.status(500).send("No Poi found");
            });

        }
        });



    });




// Aktualisiert die Kategorie eines bestimmten POIS
router.put('/poi/:id',function (req,res,next) {

    var id = req.params.id;
    var lat = req.query.lat;
    var lon = req.query.lon;
    var kat = req.query.kat;

    // Liest vorhandene POIs ein
    fs.readFile(path.join(__dirname, '..', 'pois/pois.json'), function (err,file) {
        if(err) {
            res.status(404).send("Error Updating POI");
            throw err;
        }

        // Sucht passenden POI
        var data = JSON.parse(file);
        if(data[id] != null ){
            var tmp = data[id];
            if (lat)tmp.lat = lat;
            if (lon) tmp.lon = lon;
            if (kat) tmp.kategorie = kat;
            data[id] = tmp;

            // Speichert Änderung ab
            fs.writeFile(path.join(__dirname, '..', 'pois/pois.json'), JSON.stringify(data),function () {
                console.log("Aktualisiert ! ")
            });
            res.send(data[id]);

        }
        else {
            res.send("Kein POI mit dieser ID vorhanden")
        }





    });
});

// Ruft bestimmten POI ab
router.get('/poi/:id',function (req,res,next) {

    var id = req.params.id;

    // Liest vorhandene POIs ein
    fs.readFile(path.join(__dirname, '..', 'pois/pois.json'), function (err,file) {
        if(err) {
            res.send("Error Reading File");
            throw err;
        }
        else {
            var data = JSON.parse(file);
            if(data[id] != null) res.status(200).send(data[id]);
            else res.status("404").send("Keine Route mit dieser ID gefunden");
        }
    });

});



router.get('/poi',function (req,res,next) {



    // Liest vorhandene POIs ein
    fs.readFile(path.join(__dirname, '..', 'pois/pois.json'), function (err,file) {
        if(err) {
            res.send("Error Reading File");
            throw err;
        }
        else {
            var data = JSON.parse(file);
            if(data != null) res.status(200).send(data);
            else res.status("404").send("Keine POIs gefunden");
        }
    });

});


module.exports = router;