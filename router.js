var express = require('express');
var router = express.Router();
var fetcher = require('./fetcher');
var fs = require('fs');
var poi = require('./poi');

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

router.get('/:start/:ziel/:startT',function(req,res,next){
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
});



var lauf = 0;
var poisArray = ["Pois"];
router.post('/poi/:lat/:lon/:kat',function (req,res,next) {

    var poi2 = poi.createNewPoi(lauf++,req.params.lat,req.params.lon,req.params.kat);
    poisArray[lauf] = poi2;

    fs.writeFile("./pois/pois.json", JSON.stringify(poisArray),function () {
        console.log("File Written");
    });

    res.send(poi2);
});


router.delete('/poi/:lat/:lon/',function (req,res,next) {

    var lat = req.params.lat;
    var lon = req.params.lon;
    var removed;

    fs.readFile('./pois/pois.json', function (err,file) {
        if(err) {
            res.send("Error Deleting POI");
            throw err;
        }

        var data = JSON.parse(file);
        data.forEach(function (element,index) {
            if(element.lat != null && element.lon != null ){

                if(lat === element.lat && lon === element.lon){ // Beides MÜSSEN Zahlen sein ( === )
                        removed = data.splice(index,1);
                }
            }
        });

        fs.writeFile("./pois/pois.json", JSON.stringify(data),function () {
            if(removed != null){

                res.send(removed);
            }
            else res.send("No Poi found");
        });

    });

});


router.put('/poi/:lat/:lon/:kat',function (req,res,next) {

    var lat = req.params.lat;
    var lon = req.params.lon;
    var katNeu = req.params.kat;

    fs.readFile('./pois/pois.json', function (err,file) {
        if(err) {
            res.send("Error Updating POI");
            throw err;
        }

        var data = JSON.parse(file);
        data.forEach(function (element) {
            if(element.lat != null && element.lon != null ){

                if(lat === element.lat && lon === element.lon){ // Beides MÜSSEN Zahlen sein ( === )
                    element.kategorie = katNeu;
                    res.send(element);
                }
            }
        });

        fs.writeFile("./pois/pois.json", JSON.stringify(data),function () {


        });

    });

});


router.get('/poi/:lat/:lon',function (req,res,next) {

    var lat = req.params.lat;
    var lon = req.params.lon;

    fs.readFile('./pois/pois.json', function (err,file) {
        if(err) {
            res.send("Error Updating POI");
            throw err;
        }

        var data = JSON.parse(file);
        data.forEach(function (element) {
            if(element.lat != null && element.lon != null ){

                if(lat === element.lat && lon === element.lon){ // Beides MÜSSEN Zahlen sein ( === )
                    res.send(element);
                }
            }
        });
    });

});




module.exports = router;