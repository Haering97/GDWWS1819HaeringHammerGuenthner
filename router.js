
// Init
var express = require('express');
var router = express.Router();
var fetcher = require('./fetcher');

// Routing


router.get('/',function (req,res,next) {
    res.send("Root");
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



module.exports = router;