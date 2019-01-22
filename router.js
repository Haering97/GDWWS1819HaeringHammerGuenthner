
// Init
var express = require('express');
var router = express.Router();
var fetcher = require('./fetcher');

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



module.exports = router;