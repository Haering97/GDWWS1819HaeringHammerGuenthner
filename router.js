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




router.post('/poi/:lat/:lon/:kat',function (req,res,next) {


    var poi2 = poi.createNewPoi(1,req.params.lat,req.params.lon,req.params.kat);
    fs.writeFile("pois"+poi2.id+".json", JSON.stringify(poi2),function () {
        console.log("File Written");
    });

    fs.readFile('./pois1.json', function (err, data) {
        if (err) throw err;
        else
        {
            var test = JSON.parse(data);
            console.log("test");
            console.log(test);
        }
    });
    res.send(poi2);
});




module.exports = router;