
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
    res.send(tmp);

});


router.get('/:start/:ziel/info',function (req,res,next) {
    var start = req.params.start;
    var ziel= req.params.ziel;
    res.send(start + ziel);
});




router.get('/:geo1/:geo2',function (req,res,next) {
    var geo1 = req.param("geo1");
    var geo2 = req.param("geo2");
    fetcher.getInfo(geo1,geo2);
    res.send(geo1 + geo2);
});


module.exports = router;