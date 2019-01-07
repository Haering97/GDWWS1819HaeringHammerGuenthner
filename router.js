
// Init
var express = require('express');
var router = express.Router();
var fetcher = require('./fetcher');

// Routing


router.get('/',function (req,res,next) {
    res.send("Root");

    res.send("Hey BUUUUUU");
});

router.get('/:start',function (req,res,next) {
    var geo = req.params.start;
    res.send(geo);
});


router.get('/:start/:ziel',function (req,res,next) {
    var start = req.params.start;
    var ziel= req.params.ziel;
    res.send(start + ziel );
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